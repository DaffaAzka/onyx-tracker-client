import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function LoadingButton({ loading = false, text = "Submit" }) {
  return (
    <Button type="submit" className="flex-row gap-2 w-full" disabled={loading}>
      {loading && <Spinner />}
      {text}
    </Button>
  );
}
