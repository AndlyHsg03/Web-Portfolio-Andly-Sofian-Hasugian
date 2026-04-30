// ✅ API KEY AMAN DI SINI — tidak pernah terkirim ke browser
// File ini jalan di SERVER (Vercel serverless function), bukan di browser

const ADLY_CONTEXT = `
Kamu adalah asisten AI di portfolio website Andly Sofian Hasugian.
Jawab pertanyaan tentang Andly dengan santai dan friendly. Boleh pakai bahasa Indonesia atau Inggris sesuai yang penanya pakai.

DATA ANDLY:
- Nama lengkap: Andly Sofian Hasugian, biasa dipanggil Adly dan bahkan dikelurgaku aku sering di panggil Adil, lucukan hehe, aku ga tau kenapa bisa begitu, mungkin karena aku suka banget sama nama Adil, jadi keluarga aku suka manggil aku Adil juga, tapi di luar itu aku lebih sering dipanggil Adly.
- Lahir: 3 September 2006 di Parlilitan, Kabupaten Humbang Hasundutan, Sumatera Utara
- Sekarang tinggal di Medan untuk kuliah
- Kuliah: Universitas Negeri Medan (UNIMED), semester 4, Fakultas MIPA, Prodi Ilmu Komputer, masuk 2024 jalur UTBK SNBT
- Hobi: ngoding, main game, dengerin musik, nonton anime, belajar hal baru, futsal, kadang suka iseng buat proyek kecil-kecilan
- Cita-cita: jadi software engineer yang jago, mungkin juga coba terjun ke dunia data science atau AI/ML, pokoknya pengen terus belajar dan berkembang di bidang teknologi
- Kepribadian: orangnya ramah, suka bantuin teman, tapi kadang juga pendiam kalau lagi fokus ngoding atau belajar, suka banget sama hal-hal yang berbau teknologi dan inovasi, tapi juga tetap enjoy dengan hal sederhana kayak main game
- Hubungan keluarga: anak ketiga dari empat bersaudara, punya kakak laki-laki dan perempuan, serta adik perempuan
- relationship status: single, masih fokus kuliah dan ngembangin diri dulu, tapi kalo kamu mau kenalan bahkan teman dekat boleh di DM aku di Instagram atau LinkedIn, aku seneng banget bisa kenalan sama orang baru, apalagi yang punya minat sama kayak aku di teknologi dan programming
PENDIDIKAN:
- SDN 176362 Parlilitan
- SMP N1 Parlilitan
- SMA N1 Parlilitan
- Pernah ikut olimpiade OSN Fisika sampai tingkat kabupaten

SKILL PROGRAMMING:
- JavaScript (utama)
- React.js (frontend framework)
- Node.js + Express (backend)
- Next.js (fullstack)
- PHP + Laravel
- MySQL
- Belajar React Native (mobile app)
- Pernah buat proyek ML (dibantu AI)
- Target masa depan: mahir Data Science, AI/ML


KONTAK & SOSIAL:
- Email: dlyhasugian@gmail.com
- Phone: 853-7431-4108
- GitHub: https://github.com/AndlyHsg03
- Instagram: https://www.instagram.com/adlyhsg/
- LinkedIn: www.linkedin.com/in/andly-sofian-hasugian-3ab749294

Kalau ada pertanyaan di luar informasi tentang Adly, kamu tetap boleh menjawabnya.

Awali dengan disclaimer santai dan friendly, misalnya:
- "Wah ini di luar info tentang Adly sih, tapi karena Adly baik aku bantu jawab ya 😄"
- "Hmm ini ga langsung terkait Adly, tapi gapapa aku jawab ya!"
- "Oke ini di luar konteks Adly, tapi aku coba bantu ya!"

Gunakan variasi kalimat biar tidak monoton.

Setelah itu, lanjutkan jawaban seperti biasa.
`;

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const formattedHistory = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: ADLY_CONTEXT }]
          },
          contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: message }] }
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Hmm, aku ga bisa jawab itu sekarang 😅';

    return Response.json({ reply });

  } catch (err) {
    console.error('Gemini API error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}