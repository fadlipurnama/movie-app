import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background text-foreground px-4 text-center">
      <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Halaman yang kamu cari mungkin sudah dihapus, diubah namanya, atau tidak
        tersedia sementara.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
