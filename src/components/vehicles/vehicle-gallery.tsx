export default function VehicleGallery({ images }: { images: string[] }) {
  return <div className="grid grid-cols-1 gap-2 md:grid-cols-2">{images.map((image, idx) => <img key={idx} src={image} alt="Vehicle image" className="w-full rounded object-cover" />)}</div>
}
