import { coach } from "@/content/coach";
import { styles } from "@/components/forms/form-styles";

export function FormNotice({ id }: { id: string }) {
  return (
    <>
      <noscript>
        <p className={styles.notice}>
          To send an enquiry without JavaScript,{" "}
          <a href={`mailto:${coach.email}`}>email Coach Conzo</a>.
        </p>
      </noscript>
    </>
  );
}

export function EnquiryHoneypot({ id }: { id: string }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="enquiry-verification"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
      />
    </div>
  );
}
