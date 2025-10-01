import Link from "next/link";

export default function ShoppingEditButton({_id}) {
  return (
    <Link href={`/shoppingitems/edit/${_id}`}>
      <button>✏️</button>
    </Link>
  );
}
