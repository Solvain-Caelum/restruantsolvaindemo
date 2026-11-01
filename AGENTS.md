<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Restaurant architecture
- Content pages use TanStack leaf routes and shared restaurant presentation components so navigation and page metadata stay consistent.
- Reservation validation lives in a browser-safe pure module; submissions are transient demos with no persistence or external booking calls.
- Use the shared shadcn Button and Calendar controls to keep interaction and accessibility consistent.
