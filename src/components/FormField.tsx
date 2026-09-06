// src/components/FormField.tsx
// Componente reutilizable que encapsula Controller + TextInput + error.

import React from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<T extends FieldValues = any> extends TextInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<T, any, any>;
  name: FieldPath<T>;
  label: string;
  errorMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormField<T extends FieldValues = any>({
  control,
  name,
  label,
  errorMessage,
  ...textInputProps
}: FormFieldProps<T>): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, !!errorMessage && styles.inputError]}
            value={value !== undefined && value !== null ? String(value) : ''}
            onChangeText={(text) => {
              if (textInputProps.keyboardType === 'numeric') {
                const parsed = parseInt(text, 10);
                onChange(isNaN(parsed) || text === '' ? '' : parsed);
              } else {
                onChange(text);
              }
            }}
            onBlur={onBlur}
            placeholderTextColor={COLORS.textMuted}
            {...textInputProps}
          />
        )}
      />

      {/* Mensaje de error — siempre reserva espacio para evitar layout jumps */}
      <Text style={styles.error} numberOfLines={1}>
        {errorMessage ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.error },
  error: { ...TYPOGRAPHY.error, minHeight: 16 },
});
