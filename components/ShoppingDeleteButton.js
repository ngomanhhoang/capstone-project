import Link from "next/link";

export default function ShoppingDeleteButton({_id}) {
  return (
    <Link href={`/shoppingitems/delete/${_id}`}>
      <button>❌</button>
    </Link>
  );
}
