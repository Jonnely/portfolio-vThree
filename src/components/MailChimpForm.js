import IframeMailchimpSubscribe from "./IframeMailchimpSubscribe";
import { Newsletter } from "./Newsletter";

export const MailchimpForm = () => {
  const action = "https://titootits.us20.list-manage.com/subscribe/post";
  const u = "c05170ec65798b78038cf073c";
  const id = "a607814f0c";

  return (
    <IframeMailchimpSubscribe
      action={action}
      u={u}
      id={id}
      render={({ subscribe, status, message }) => (
        <Newsletter
          onValidated={(formData) => subscribe(formData)}
          status={status}
          message={message}
        />
      )}
    />
  );
};
