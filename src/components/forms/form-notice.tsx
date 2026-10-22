import { coach } from "@/content/coach";
import { styles } from "@/components/forms/form-styles";

export function FormNotice({ id }: { id: string }) {
  return (
    <>
      <p id={id} className={styles.notice}>
        Your details will be emailed to Coach Conzo to respond to your enquiry.
        Please avoid sharing sensitive health information.
      </p>
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
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
