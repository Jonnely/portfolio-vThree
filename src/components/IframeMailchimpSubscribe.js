import React, { useRef, useState } from "react";

export default function IframeMailchimpSubscribe({ action, u, id, render }) {
  const formRef = useRef(null);

  // mimic react-mailchimp-subscribe's status/message shape
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [message, setMessage] = useState(null);

  const subscribe = (formData) => {
    if (!formRef.current) return;

    setStatus("sending");
    setMessage(null);

    // remove previous dynamic fields (important on resubmit)
    formRef.current
      .querySelectorAll(".dynamic-field")
      .forEach((el) => el.remove());

    // append new form fields as hidden inputs
    Object.entries(formData || {}).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value == null ? "" : String(value);
      input.className = "dynamic-field";
      formRef.current.appendChild(input);
    });

    // submit POST to Mailchimp
    formRef.current.submit();

    // optimistic success (can't read cross-origin response)
    setStatus("success");
    setMessage("Thanks for subscribing!");
  };

  return (
    <>
      <iframe name="mc_iframe" title="mailchimp" style={{ display: "none" }} />

      <form ref={formRef} action={action} method="POST" target="mc_iframe">
        <input type="hidden" name="u" value={u} />
        <input type="hidden" name="id" value={id} />
      </form>

      {render({ subscribe, status, message })}
    </>
  );
}
