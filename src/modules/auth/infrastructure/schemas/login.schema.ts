import {z} from "zod";

const loginSchema = z.object({
    email: z.string().email({
        message: 'Formato de correo inválido.',
    }),
    // add a field named 'password', it could be alphanum with at least 4 chars, max 10.
    // add error messages in spanish
    password: z.string().min(4, {
        message: 'Al menos 4 caracteres.',
    }).max(8, {
        message: 'Como máximo 8 caracteres.',
    }).regex(/[a-zA-Z0-9]+/, {
        message: 'Solo caracteres alfanuméricos.'
    })
})

export default loginSchema;