import { coach } from "@/content/coach";
import type { FormMode } from "@/types/forms";
import styles from "./forms.module.css";

export function FormNotice({ mode, id }: { mode: FormMode; id: string }) {
  return (
    <>
      <p id={id} className={styles.previewNotice}>
        {mode === "preview"
          ? "This is a local preview. No booking or message will be sent."
          : "Your details will be emailed to Coach Conzo to respond to your enquiry. Please avoid sharing sensitive health information."}
      </p>
      <noscript>
        <p className={styles.previewNotice}>
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
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
