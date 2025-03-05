"use client";

import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  register: any;
  errors: any;
  type: string;
  placeholder?: string;
  validation?: object;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  register,
  errors,
  type,
  placeholder,
  validation,
  options,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-secondary font-medium">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          {...register(id, validation)}
          className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id, validation)}
          className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
        />
      )}
      {errors[id] && <p className="text-error text-sm">{errors[id].message}</p>}
    </div>
  );
};

export default FormField;
