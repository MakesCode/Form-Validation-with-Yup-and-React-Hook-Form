import * as yup from "yup"
import { useFormWithValidation } from "./hook/useFormWithValidation"
import { SubmitHandler } from "react-hook-form"
import { Toaster, toast } from "sonner"

interface IFormInput {
  email: string
  password: string
}
const validationSchema = yup
  .object({
    email: yup.string().email("L'email n'est pas valide").required("Email : Champ Required"),
    password: yup.string().min(5, "Le mot de passe doit contenir au moins 5 caratères").required("Mot de passe : Champ Required"),
  })

export const App = () => {
  const defaultValues = {
    email: "",
    password: "",
  }
  const { register, handleSubmit } = useFormWithValidation(validationSchema, defaultValues)

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    toast.success("Success", { description: JSON.stringify(data) });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoFocus>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Toaster />
    </>
  )
}

