# Kontekst Projektu (MyLittleEcommerce) dla Agentów AI (Gemini)

Ten plik służy jako baza wiedzy, kontekst i zestaw reguł (skills) dla każdego Agenta AI, który ma za zadanie edytować, czytać lub integrować kod w ramach tego obszaru roboczego (Workspace).

## 1. Cel i Natura Projektu
- **Czym to jest?** To produkcyjny, kliencki "frontend" platformy e-commerce, oparty na frameworku Next.js (App Router). 
- **Do czego służy?** Aplikacja ta prezentuje sklep internetowy użytkownikom końcowym, umożliwia autoryzację, przeglądanie produktów oraz obsługę procesu płatności.
- **Relacja z resztą ekosystemu:** Ten projekt jest nowoczesną warstwą prezentacji. Projekt poboczny `MyLittleEcommerceBackend` (oparty na Magento) funkcjonuje tu jako poligon testowy dla analityki, a ruch generowany przez użytkowników może docelowo stanowić bazę dla działań agenta AI. Z powodów oszczędności czasu, w podstawowym założeniu zrezygnowano jednak z rygorystycznego łączenia go przez GraphQL z instalacją testową Magento, decydując się na prostsze i lżejsze rozwiązania (API / Stripe / Clerk).

## 2. Kluczowe Decyzje Architektoniczne
1. **Technologie Główne:** Next.js (wersja >=16), React, TypeScript, TailwindCSS.
2. **Autoryzacja:** Zintegrowany pakiet `@clerk/nextjs` odpowiedzialny za rejestrację i logowanie.
3. **Płatności:** Wykorzystany pakiet `stripe` i odpowiednie trasy/endpointy do wdrożenia płatności testowych (np. Stripe Checkout).
4. **Style i UI:** Kod wizualny oparty o TailwindCSS z uwzględnieniem `lucide-react` jako pakietu ikon. Należy projektować zgodnie z wytycznymi UI/UX "premium" - płynne animacje, spójne palety barw i dbałość o detal.

## 3. Wytyczne dla Agenta przy edycji
- **Styl pisania kodu:** Pisz nowoczesny, dobrze otypowany kod React Server Components tam, gdzie to możliwe, zachowując pliki `'use client'` tylko do stanów i interaktywności. Unikaj starszych wzorców (Pages Router, nieskończone zagnieżdżanie w hookach).
- **Komponenty i estetyka:** Każdy nowy moduł sklepu (katalog, koszyk, panel konta) powinien sprawiać wrażenie oprogramowania z "górnej półki", dbając o stany ładowania (suspense), obsługę błędów i czytelność na różnych szerokościach ekranu.
- **Odpowiedzi i Planowanie:** Zawsze testuj wprowadzane zmiany pod kątem integracji z Clerk (weryfikacja stanu logowania). Jeśli modyfikujesz przepływ klienta (np. dodawanie do koszyka), upewnij się, że stan globalny i synchronizacja z backendem/API są solidnie zaprogramowane.
- **Triage i Testowanie:** Zanim cokolwiek zostanie uznane za ukończone i oddane użytkownikowi, upewnij się, że rozwiązanie zostało poddane krytycznej weryfikacji (triage) oraz przetestowane (dopuszczalne do 3 iteracji poprawek).

## 4. Wytyczne dot. Middleware (Next.js 16+)
- **Konwencja `proxy.ts`:** Wersja Next.js uzywana w projekcie korzysta z nowej konwencji pliku `proxy.ts` w katalogu `src/` zamiast przestarzałego `middleware.ts`. Zmiana nazwy na `middleware.ts` powoduje błędy i niepotrzebne ostrzeżenia z Next.js.
- **Ochrona przed awariami (MIDDLEWARE_INVOCATION_FAILED):** Middleware autoryzacji (Clerk) musi koniecznie być wdrożone za pomocą `try/catch`, np. opakowując wywołanie `clerkMiddleware()` w bloku try catch, tak by brak zmiennych środowiskowych (Vercel/Amplify) nie powodował globalnego błędu `500: INTERNAL_SERVER_ERROR`. 
- **Zasady edycji `proxy.ts`:** Plik nie może zawierać innych exportów obok `proxy` i `config`, eksport typu `export default clerk;` jest niewspierany dla nowej konwencji proxy.
