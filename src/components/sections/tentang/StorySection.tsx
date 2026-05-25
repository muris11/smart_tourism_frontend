/**
 * StorySection - Komponen untuk menampilkan cerita tentang kami
 * 
 * Fitur:
 * - Layout center dengan max-width container
 * - Typography responsive (mobile ke desktop)
 * - Teks dengan font-light dan leading-relaxed untuk readability
 * - Warna slate yang soft untuk kenyamanan membaca
 * - Spacing konsisten antar paragraf
 * 
 * @component
 * @returns {JSX.Element} Komponen cerita section
 * 
 * @example
 * // Penggunaan di halaman tentang
 * <StorySection />
 * 
 * @example
 * // Penggunaan dengan layout berbeda (jika perlu)
 * <div className="bg-gray-50">
 *   <StorySection />
 * </div>
 */
'use client'

/**
 * Komponen StorySection untuk menampilkan cerita dan misi perusahaan
 * 
 * @returns {JSX.Element} Story section dengan konten naratif
 */
export default function StorySection() {
    return (
        <section className="mx-auto mb-24 max-w-4xl px-6 md:px-12">
            <h2 className="mb-8 text-center text-4xl text-brand-navy">
                Cerita Kami
            </h2>

            <div className="mx-auto space-y-6 text-lg leading-relaxed font-light text-slate-600">
                <p>
                    Semuanya bermula dari sebuah kesadaran sederhana:
                    banyak cerita lokal, resep leluhur, dan sudut-sudut
                    indah di Indonesia yang perlahan terlupakan karena
                    tidak terdokumentasi dengan baik.
                </p>

                <p>
                    CITRA membawa semangat itu ke konteks digital
                    Ciayumajakuning: menghadirkan rasa editorial,
                    konteks lokal, dan eksplorasi yang tidak terasa
                    generik.
                </p>

                <p>
                    Misi kami bukan sekadar menunjukkan tempat yang
                    indah untuk dilihat, tetapi memberi konteks, alur,
                    dan pengalaman yang terasa lebih bermakna.
                </p>
            </div>
        </section>
    )
}