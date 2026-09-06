// src/screens/CreateScreen.tsx
// Modal para registrar una nueva obra de arte en la API mediante useCreateItem (useMutation).

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  // Campos del formulario adaptados al dominio Museo de Arte
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [room, setRoom] = useState('');
  const [technique, setTechnique] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');

  // Mutación de TanStack Query
  const { mutate: createItem, isPending } = useCreateItem();

  function handleSubmit(): void {
    if (!name.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre de la obra.');
      return;
    }

    if (!artist.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre del artista.');
      return;
    }

    const payload = {
      name: name.trim(),
      artist: artist.trim(),
      year: parseInt(year.trim(), 10) || new Date().getFullYear(),
      room: room.trim() || 'Sala de Adquisiciones Recientes',
      technique: technique.trim() || 'Óleo sobre lienzo',
      period: period.trim() || 'Arte Moderno',
      description: description.trim() || 'Obra incorporada recientemente a la colección del museo.',
    };

    createItem(payload, {
      onSuccess: () => {
        navigation.goBack();
      },
      onError: (err) => {
        Alert.alert('Error al guardar', err.message || 'No se pudo guardar la obra en el servidor.');
      },
    });
  }

  const canSubmit = name.trim().length > 0 && artist.trim().length > 0 && !isPending;

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
        <View style={styles.headerInfo}>
          <Ionicons name="color-palette-outline" size={24} color={COLORS.accent} />
          <Text style={styles.sectionLabel}>Registro de Nueva Obra</Text>
        </View>

        {/* Nombre de la Obra */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre de la Obra <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Impresión, sol naciente"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Artista */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Artista / Autor <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={artist}
            onChangeText={setArtist}
            placeholder="Ej: Claude Monet"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Fila: Año y Período */}
        <View style={styles.row}>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.fieldLabel}>Año</Text>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="Ej: 1872"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.fieldLabel}>Período</Text>
            <TextInput
              style={styles.input}
              value={period}
              onChangeText={setPeriod}
              placeholder="Ej: Impresionismo"
              placeholderTextColor={COLORS.textMuted}
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Sala del Museo */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Sala de Exhibición</Text>
          <TextInput
            style={styles.input}
            value={room}
            onChangeText={setRoom}
            placeholder="Ej: Sala 4 - Pintura Francesa"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Técnica */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Técnica</Text>
          <TextInput
            style={styles.input}
            value={technique}
            onChangeText={setTechnique}
            placeholder="Ej: Óleo sobre lienzo"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        {/* Descripción Histórica */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción Histórica</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe los detalles, origen e importancia de la obra..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botón Guardar */}
        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Registrar Obra en la Colección</Text>
          )}
        </Pressable>

        {/* Botón Cancelar */}
        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 13,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  field: {
    gap: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfField: {
    flex: 1,
  },
  fieldLabel: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  multiline: {
    minHeight: 90,
    paddingTop: SPACING.sm,
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.background,
  },
  cancel: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  cancelText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
});
