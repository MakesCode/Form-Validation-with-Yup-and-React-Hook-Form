import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


export const useFormWithValidation = (validationSchema: any, defaultValues: any) => {
  const resolver = useYupValidationResolver(validationSchema)
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: "onSubmit",
    defaultValues: defaultValues,
    resolver: resolver,
  })
  return form
}

export const useYupValidationResolver = (validationSchema: any) =>
  React.useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })
        return {
          values,
          errors: {},
        }
      } catch (errors: any) {

        const errorsPipe = errors.inner.reduce(
          (allErrors: any, currentError: any) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {}
        )
        toast.error(
          <div>
            {Object.values(errorsPipe).map((err: any, index) => (
              <div key={index}>{err.message}</div>
            ))}
          </div>
        )
        return {
          values: {},
          errors: errorsPipe,
        }
      }
    },
    [validationSchema]
  )