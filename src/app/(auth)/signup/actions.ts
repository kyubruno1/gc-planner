'use server'

import { signUpService } from '@/services/auth/signUp'

export async function signUp(formData: FormData) {
  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  await signUpService({ username, password })

  // Não faz login automático aqui ainda.
  // Depois podemos logar automaticamente usando signIn("credentials").
  return { ok: true }
}
