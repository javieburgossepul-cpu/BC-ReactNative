// src/screens/EditScreen.tsx
// Formulario para editar una obra existente con React Hook Form + Zod.

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const { data: item, isLoading } = useItemById(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      artist: '',
      year: 1900,
      room: '',
      body: '',
    },
  });

  // Cuando se cargan los datos del servidor, rellenamos el formulario con reset()
  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        artist: item.artist || 'Maestro Anónimo',
        year: item.year || 1900 + (item.id * 7) % 120,
        room: item.room || `Sala ${(item.id % 12) + 1}`,
        body: item.body || '',
      });
    }
  }, [item, reset]);

  const { mutate: updateItem, isPending } = useUpdateItem();

  function onSubmit(data: ItemFormData): void {
    updateItem(
      {
        id: Number(id),
        title: data.title,
        artist: data.artist,
        year: data.year,
        room: data.room || 'Sala General',
        body: data.body || '',
        userId: 1,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = !isSubmitting && !isPending && isDirty;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.hint}>
          Modifica los campos de la obra seleccionada y guarda los cambios.
        </Text>

        <FormField
          control={control}
          name="title"
          label="Nombre de la Obra *"
          placeholder="Ej: La Mona Lisa"
          returnKeyType="next"
          errorMessage={errors.title?.message}
        />

        <FormField
          control={control}
          name="artist"
          label="Artista / Autor *"
          placeholder="Ej: Leonardo da Vinci"
          returnKeyType="next"
          errorMessage={errors.artist?.message}
        />

        <FormField
          control={control}
          name="year"
          label="Año de Creación *"
          placeholder="Ej: 1503"
          keyboardType="numeric"
          returnKeyType="next"
          errorMessage={errors.year?.message}
        />

        <FormField
          control={control}
          name="room"
          label="Sala del Museo"
          placeholder="Ej: Sala 6 - Pintura Renacentista"
          returnKeyType="next"
          errorMessage={errors.room?.message}
        />

        <FormField
          control={control}
          name="body"
          label="Descripción Histórica"
          placeholder="Contexto, técnica e historia de la obra..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          errorMessage={errors.body?.message}
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending ? (
              <ActivityIndicator size="small" color={COLORS.background} />
            ) : (
              <Text style={styles.buttonText}>Guardar Cambios</Text>
            )}
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  hint: { ...TYPOGRAPHY.caption, fontStyle: 'italic' },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
