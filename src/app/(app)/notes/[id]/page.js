export default async function Page({params}) {
    const {id} = await params;
    const res = await fetch(`https://v1.appbackend.io/v1/rows/auD776G0Skgu/${_id}`);
  const  { data: note }  = await res.json();

  return (
    <div>
        <div>{note.title}</div>
        <div>{note.content}</div>

        <Link href="/">Back to All Notes</Link>
    </div>
  )
}
