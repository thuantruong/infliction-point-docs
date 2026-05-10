const TRANSLATIONS = {
  en: {
    // Nav
    'nav.features': 'Features',
    'nav.formats': 'Formats',
    'nav.download': 'Download',
    'nav.faqs': 'FAQs',

    // Footer
    'footer.copyright': '© 2an.dev. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.instagram': 'Instagram',

    // Hero
    'hero.headline': 'SCORE SMARTER.<br><span class="accent">ELEVATE THE GAME.</span>',
    'hero.tagline1': 'TAP',
    'hero.tagline2': 'SCORE',
    'hero.tagline3': 'PLAY',
    'hero.body': 'Tap with your phone, watch, or a remote.<br>See scores on an LED display or TV.<br>Stay in the game flow.',
    'hero.cta': 'Get it on Google Play',

    // Features
    'features.heading': 'Everything you need on court',
    'features.sub': 'Score, announce, display, and track — without interrupting the game.',
    'feat.tap.title': 'Tap to Score',
    'feat.tap.body': 'Full-screen split layout. Tap your team\'s half to award a point. Blue vs orange — impossible to miss. Made a mistake? Undo it.',
    'feat.handsfree.title': 'Hands-Free Scoring',
    'feat.handsfree.body': 'Pair a Bluetooth shutter remote or up to 2 Flic buttons. Score, undo, call faults, and switch serve without touching the phone. Auto change ends swaps court sides at the right moment.',
    'feat.umpire.title': 'Your Personal Courtside Umpire',
    'feat.umpire.body': 'TTS announces every point, game, set, and match. Call faults, lets, and outs from the Say panel. English, German, and Indonesian — configurable language, voice, and speed. 4 custom sound slots with file picker and in-app recorder.',
    'feat.players.title': 'Put Names to the Game',
    'feat.players.body': 'Assign players to each team before every match. Persistent directory with recency and frequency suggestions. Player names appear on the scoreboard, in announcements, and on displays.',
    'feat.stats.title': 'Match Stats & History',
    'feat.stats.body': 'Tap the center overlay for set-by-set scores, serving info, and match duration. Every completed match saved — date-grouped history with full set breakdowns.',
    'feat.wear.title': 'Wear OS Companion',
    'feat.wear.body': 'Live scoreboard on your wrist with haptic feedback. Score, undo, switch serve, and reannounce from your watch. Swipe for match stats and the Say page.',
    'feat.cast.title': 'Cast to the Big Screen',
    'feat.cast.body': 'Cast live scores to any Chromecast-enabled TV. VS preview screen before the match starts.',
    'feat.led.title': 'LED Courtside Display',
    'feat.led.body': 'Connect our BLE LED matrix for live courtside scoring. Team colors on 64×32 RGB displays, serve indicator, score animations, and adjustable brightness. Sides swap on the display when you change ends. Player VS preview before the match. OTA firmware updates from the app.',

    // Formats
    'formats.heading': 'Your Court, Your Rules',
    'formats.sub': 'From classic tennis scoring to casual point-based games.',
    'fmt.classic.title': 'Classic',
    'fmt.classic.sub': 'Full padel/tennis scoring with deep configuration.',
    'fmt.classic.li1': 'Best of 1–5 sets',
    'fmt.classic.li2': '3, 4, 5, or 6 games per set',
    'fmt.classic.li3': 'Golden point, advantage, or star point deuce',
    'fmt.classic.li4': 'Tiebreak, two-game lead, or no margin',
    'fmt.classic.li5': 'Short set and sudden death options',
    'fmt.classic.li6': 'Match tiebreak for even best-of sets',
    'fmt.totalgames.title': 'Total Games',
    'fmt.totalgames.sub': 'Play a fixed number of games. Most wins takes the match.',
    'fmt.totalgames.li1': '3 to 9 games',
    'fmt.totalgames.li2': 'All games are played',
    'fmt.totalgames.li3': 'Even totals can end in a draw',
    'fmt.totalgames.li4': 'Golden point, advantage, or star point per game',
    'fmt.fixedpoint.title': 'Fixed Point',
    'fmt.fixedpoint.sub': 'Americano-style scoring. Each tap is one point — no 15/30/40, just a race to the target.',
    'fmt.fixedpoint.li1': '16, 21, 24, or 32 points',
    'fmt.fixedpoint.li2': 'Configurable serve rotation',
    'fmt.fixedpoint.li3': 'Tiebreak rules for even totals',

    // Download
    'download.cta': 'Get it on Google Play',

    // FAQs page
    'faq.page.title': 'FAQs',
    'faq.page.sub': 'Answers to common questions about match formats, scoring rules, and accessories.',
    'faq.toc.classic': 'Classic',
    'faq.toc.total-games': 'Total Games',
    'faq.toc.fixed-points': 'Fixed Points',
    'faq.toc.accessories': 'Accessories',
    'faq.section.classic': 'Classic format',
    'faq.section.total-games': 'Total Games format',
    'faq.section.fixed-points': 'Fixed Points format',
    'faq.section.accessories': 'Accessories',

    // Classic Q&As
    'faq.classic.q1': 'What is Classic format?',
    'faq.classic.a1': '<p>Classic is the standard padel/tennis scoring structure: points (0 / 15 / 30 / 40), games, and sets. The first team to win the configured number of sets wins the match.</p>',
    'faq.classic.q2': 'How many sets can I play?',
    'faq.classic.a2': '<p>You can choose best of 1, 2, 3, 4, or 5 sets. Odd totals (1, 3, 5) always produce a winner. Even totals (2, 4) can end in a tie or be decided with a Super Tiebreak — configurable in the setup screen.</p>',
    'faq.classic.q3': 'How many games per set?',
    'faq.classic.a3': '<p>Sets can be played to 3, 4, 5, or 6 games. The first team to reach the target wins the set, subject to the tiebreak rule you\'ve chosen.</p>',
    'faq.classic.q4': 'What are the deuce rules?',
    'faq.classic.a4': `<p>Three options apply when a game reaches 40–40:</p>
<ul>
  <li><strong>Golden Point</strong> — the next point wins the game outright.</li>
  <li><strong>Advantage</strong> — a team must win two consecutive points to take the game.</li>
  <li><strong>Star Point</strong> — after two deuces the game becomes sudden death; the next point wins.</li>
</ul>`,
    'faq.classic.q5': 'What is a tiebreak?',
    'faq.classic.a5': `<p>When both teams reach a set-score tie (e.g. 5–5 in a 6-game set), a tiebreak is played — first to 7 points, win by 2.</p>
<p>Two optional sub-rules are available when Tiebreak is selected:</p>
<ul>
  <li><strong>Short Set</strong> — the tiebreak triggers one game earlier (e.g. 4–4 in a 6-game set), and the winning team takes the set by one game (5–4).</li>
  <li><strong>Sudden Death</strong> — at 6–6 in the tiebreak, the next point wins instead of requiring a 2-point lead.</li>
</ul>`,
    'faq.classic.q6': 'What is a Super Tiebreak / Match Tiebreak?',
    'faq.classic.a6': `<p>For even-set formats (2 or 4 sets), if sets are tied at the end you can play a Super Tiebreak to decide the match — first to 10 points, win by 2. An optional Sudden Death sub-rule makes the point at 9–9 decisive.</p>
<p>If you prefer not to play on, choose <strong>No Margin</strong> instead and the match ends in a draw.</p>`,
    'faq.classic.q7': 'What is Auto Change Ends?',
    'faq.classic.a7': '<p>When enabled, the app automatically flips the court-side display after every odd-total game in a set — and every 6 tiebreak points — matching the standard padel rotation rule. A "Change ends" voice announcement plays at each swap.</p>',

    // Total Games Q&As
    'faq.totalgames.q1': 'What is Total Games format?',
    'faq.totalgames.a1': '<p>A fixed number of games is played (3–9) with no sets. Deuce rules (Golden Point, Advantage, or Star Point) still apply to each individual game. The team that wins the most games wins the match.</p>',
    'faq.totalgames.q2': 'Can it end in a draw?',
    'faq.totalgames.a2': '<p>Yes — even-game totals (4, 6, 8) can end in a draw if both teams win the same number of games. Odd totals (3, 5, 7, 9) always produce a winner.</p>',
    'faq.totalgames.q3': 'Does serve rotation work in Total Games?',
    'faq.totalgames.a3': '<p>Serve follows the same game-by-game pattern as Classic — the server alternates each game, and you can switch manually before the first point or via an accessory button.</p>',

    // Fixed Points Q&As
    'faq.fixedpoints.q1': 'What is Fixed Points format?',
    'faq.fixedpoints.a1': '<p>Each tap scores exactly one raw point — there\'s no 0 / 15 / 30 / 40 cycle, no games, and no sets. A fixed total of points is played (16, 21, 24, or 32). The team with more points at the end wins. This is the format used in Americano padel, where 21 points is the most common target.</p>',
    'faq.fixedpoints.q2': 'How does serve rotation work?',
    'faq.fixedpoints.a2': '<p>Serve rotates automatically every N points. You can set N to 1, 2, 3, 4, or 5 — the default is 2. The current server is shown by a tennis-ball indicator on the scoreboard.</p>',
    'faq.fixedpoints.q3': 'What is the tiebreak at halfway?',
    'faq.fixedpoints.a3': `<p>For even-point totals (16, 24, 32), if scores are tied when exactly half the points have been played, a tiebreak can be triggered. Three options:</p>
<ul>
  <li><strong>No Margin</strong> — the match ends in a draw.</li>
  <li><strong>Golden Point</strong> — one sudden-death point decides the match.</li>
  <li><strong>Advantage</strong> — play continues until one team leads by 2 points.</li>
</ul>
<p>The 21-point format has an odd total and never triggers a tiebreak.</p>`,

    // Accessories Q&As
    'faq.accessories.q1': 'What are Flic buttons?',
    'faq.accessories.a1': `<p>First-generation Flic Bluetooth buttons let you score hands-free from anywhere on the court. Pair up to 2 buttons from the Accessories screen (requires the Flic app to be installed).</p>
<ul>
  <li><strong>1-button mode</strong> — single click: Team 1 point; double click: Team 2 point; hold: undo.</li>
  <li><strong>2-button mode</strong> — single click: point for that button's assigned team; double click: reannounce score; hold: undo (or switch serve before the first point).</li>
</ul>`,
    'faq.accessories.q2': 'What is a shutter remote?',
    'faq.accessories.a2': `<p>Bluetooth camera shutter remotes (the kind used as phone selfie clickers) connect as HID keyboard devices. Infliction Point detects their key presses and lets you map each button to a scoreboard action: score a point, undo, call a fault, service let, rally let, out, reannounce, or play a custom sound.</p>
<p>Configure mappings from <strong>Accessories → Shutter Remote</strong>.</p>`,
    'faq.accessories.q3': 'What is the LED display?',
    'faq.accessories.a3': `<p>Our LED matrix display connects over Bluetooth and shows the live score in real time.</p>
<ul>
  <li>64×32 RGB with team colors, serve arrow, and animations.</li>
</ul>
<p>Connect from <strong>Accessories → LED Display</strong>. Brightness is adjustable, and the display message while waiting for a match is customisable.</p>`,
    'faq.accessories.q4': 'How does Chromecast work?',
    'faq.accessories.a4': '<p>Tap the cast icon in <strong>Accessories → Chromecast</strong> to connect to any Chromecast-enabled TV on the same network. A full-screen scoreboard appears on the TV and updates live with every point scored.</p>',
    'faq.accessories.q5': 'How does the Wear OS companion app work?',
    'faq.accessories.a5': `<p>Install Infliction Point on your Wear OS 3+ watch from the Play Store. It pairs automatically with the phone app over the Wearable Data Layer — no manual setup needed.</p>
<p>From your wrist you can score, undo, switch serve, reannounce, and trigger announcements (fault, let, out, custom sounds). The watch also shows a live match stats page and vibrates on scoring events — short pulse for points, longer for games and sets.</p>`,
    'faq.accessories.q6': 'Can I use multiple accessories at the same time?',
    'faq.accessories.a6': '<p>Yes. Flic buttons, shutter remotes, the LED display, Chromecast, and the Wear OS watch all work independently and simultaneously. Each updates from the same match state.</p>',

    // Privacy page
    'priv.title': 'Privacy Policy',
    'priv.updated': 'Last updated: April 19, 2026',
    'priv.h.collection': 'Data Collection',
    'priv.p.collection': 'Infliction Point does not collect, transmit, or share any personal data with external servers. All data is stored locally on your device only.',
    'priv.h.history': 'Match History',
    'priv.p.history': 'Completed match results are saved locally in an on-device database (SQLite via Room) so you can review past matches. This data never leaves your device and can be deleted at any time from within the app.',
    'priv.h.players': 'Player Names',
    'priv.p.players': 'If you use the player assignment feature, the names you enter are stored locally in an on-device database for convenience (autofill suggestions and match history display). Player names are never transmitted externally. You can delete individual players or clear the entire directory from within the app.',
    'priv.h.wearable': 'Wearable Data Layer',
    'priv.p.wearable': 'If you use the Wear OS companion app, match state is synced between your phone and watch via Google\'s Wearable Data Layer API. This data stays entirely on your devices and is not sent to any external server.',
    'priv.h.thirdparty': 'Third-Party Services',
    'priv.p.thirdparty': 'The app uses Android\'s built-in Text-to-Speech engine for score announcements. No data is sent to 2an.dev or any third-party servers.',
    'priv.h.bluetooth': 'Bluetooth Devices',
    'priv.p.bluetooth': 'If you pair a Flic button, its MAC address is stored locally on your device in SharedPreferences for reconnection purposes. If you configure a Bluetooth shutter remote, key mappings are stored locally. No Bluetooth device data is transmitted externally.',
    'priv.h.changes': 'Changes to This Policy',
    'priv.p.changes': 'We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.',
    'priv.h.contact': 'Contact',
    'priv.p.contact': 'If you have questions about this privacy policy, contact us at <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',
  },

  id: {
    // Nav
    'nav.features': 'Fitur',
    'nav.formats': 'Format',
    'nav.download': 'Unduh',
    'nav.faqs': 'FAQ',

    // Footer
    'footer.copyright': '© 2an.dev. Hak cipta dilindungi.',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.contact': 'Kontak',
    'footer.instagram': 'Instagram',

    // Hero
    'hero.headline': 'SKOR LEBIH CERDAS.<br><span class="accent">TINGKATKAN PERMAINAN.</span>',
    'hero.tagline1': 'KETUK',
    'hero.tagline2': 'SKOR',
    'hero.tagline3': 'MAIN',
    'hero.body': 'Ketuk dengan ponsel, jam tangan, atau remote.<br>Lihat skor di layar LED atau TV.<br>Tetap fokus dalam permainan.',
    'hero.cta': 'Unduh di Google Play',

    // Features
    'features.heading': 'Semua yang Anda butuhkan di lapangan',
    'features.sub': 'Skor, umumkan, tampilkan, dan catat — tanpa mengganggu permainan.',
    'feat.tap.title': 'Ketuk untuk Skor',
    'feat.tap.body': 'Tata letak layar penuh. Ketuk bagian tim Anda untuk memberi poin. Biru vs oranye — tak mungkin terlewat. Salah ketuk? Batalkan.',
    'feat.handsfree.title': 'Skor Tanpa Tangan',
    'feat.handsfree.body': 'Pasangkan remote shutter Bluetooth atau hingga 2 tombol Flic. Cetak skor, batalkan, panggil fault, dan ganti servis tanpa menyentuh ponsel. Pergantian sisi otomatis membalik posisi lapangan di waktu yang tepat.',
    'feat.umpire.title': 'Wasit Pribadi di Pinggir Lapangan',
    'feat.umpire.body': 'TTS mengumumkan setiap poin, game, set, dan pertandingan. Panggil fault, let, dan out dari panel Say. Bahasa Inggris, Jerman, dan Indonesia — bahasa, suara, dan kecepatan dapat dikonfigurasi. 4 slot suara kustom dengan pemilih file dan perekam dalam aplikasi.',
    'feat.players.title': 'Beri Nama pada Pertandingan',
    'feat.players.body': 'Tetapkan pemain ke setiap tim sebelum pertandingan. Direktori persisten dengan saran berdasarkan recency dan frekuensi. Nama pemain tampil di papan skor, pengumuman, dan layar.',
    'feat.stats.title': 'Statistik & Riwayat Pertandingan',
    'feat.stats.body': 'Ketuk overlay tengah untuk skor per set, info servis, dan durasi pertandingan. Setiap pertandingan yang selesai tersimpan — riwayat berdasarkan tanggal dengan rincian set lengkap.',
    'feat.wear.title': 'Aplikasi Pendamping Wear OS',
    'feat.wear.body': 'Papan skor langsung di pergelangan tangan dengan umpan balik haptic. Cetak skor, batalkan, ganti servis, dan umumkan ulang dari jam tangan Anda. Geser untuk statistik pertandingan dan halaman Say.',
    'feat.cast.title': 'Tampilkan di Layar Besar',
    'feat.cast.body': 'Tampilkan skor langsung ke TV berkemampuan Chromecast. Layar pratinjau VS sebelum pertandingan dimulai.',
    'feat.led.title': 'Layar LED di Pinggir Lapangan',
    'feat.led.body': 'Hubungkan matrix LED BLE kami untuk skor langsung di pinggir lapangan. Warna tim di layar RGB 64×32, indikator servis, animasi skor, dan kecerahan yang dapat disesuaikan. Sisi bertukar di layar saat Anda ganti ends. Pratinjau VS pemain sebelum pertandingan. Pembaruan firmware OTA dari aplikasi.',

    // Formats
    'formats.heading': 'Lapangan Anda, Aturan Anda',
    'formats.sub': 'Dari skor tenis klasik hingga permainan berbasis poin yang santai.',
    'fmt.classic.title': 'Klasik',
    'fmt.classic.sub': 'Skor padel/tenis penuh dengan konfigurasi mendalam.',
    'fmt.classic.li1': 'Best of 1–5 set',
    'fmt.classic.li2': '3, 4, 5, atau 6 game per set',
    'fmt.classic.li3': 'Deuce golden point, advantage, atau star point',
    'fmt.classic.li4': 'Tiebreak, selisih dua game, atau tanpa margin',
    'fmt.classic.li5': 'Opsi short set dan sudden death',
    'fmt.classic.li6': 'Match tiebreak untuk format best-of genap',
    'fmt.totalgames.title': 'Total Game',
    'fmt.totalgames.sub': 'Mainkan jumlah game yang tetap. Menang terbanyak meraih pertandingan.',
    'fmt.totalgames.li1': '3 hingga 9 game',
    'fmt.totalgames.li2': 'Semua game dimainkan',
    'fmt.totalgames.li3': 'Jumlah genap bisa berakhir seri',
    'fmt.totalgames.li4': 'Golden point, advantage, atau star point per game',
    'fmt.fixedpoint.title': 'Poin Tetap',
    'fmt.fixedpoint.sub': 'Skor gaya Americano. Setiap ketukan satu poin — tanpa 15/30/40, hanya lomba ke target.',
    'fmt.fixedpoint.li1': '16, 21, 24, atau 32 poin',
    'fmt.fixedpoint.li2': 'Rotasi servis yang dapat dikonfigurasi',
    'fmt.fixedpoint.li3': 'Aturan tiebreak untuk total genap',

    // Download
    'download.cta': 'Unduh di Google Play',

    // FAQs page
    'faq.page.title': 'FAQ',
    'faq.page.sub': 'Jawaban atas pertanyaan umum tentang format pertandingan, aturan skor, dan aksesori.',
    'faq.toc.classic': 'Klasik',
    'faq.toc.total-games': 'Total Game',
    'faq.toc.fixed-points': 'Poin Tetap',
    'faq.toc.accessories': 'Aksesori',
    'faq.section.classic': 'Format Klasik',
    'faq.section.total-games': 'Format Total Game',
    'faq.section.fixed-points': 'Format Poin Tetap',
    'faq.section.accessories': 'Aksesori',

    // Classic Q&As
    'faq.classic.q1': 'Apa itu format Klasik?',
    'faq.classic.a1': '<p>Format Klasik adalah struktur skor padel/tenis standar: poin (0 / 15 / 30 / 40), game, dan set. Tim pertama yang memenangkan jumlah set yang dikonfigurasi memenangkan pertandingan.</p>',
    'faq.classic.q2': 'Berapa banyak set yang bisa dimainkan?',
    'faq.classic.a2': '<p>Anda dapat memilih best of 1, 2, 3, 4, atau 5 set. Jumlah ganjil (1, 3, 5) selalu menghasilkan pemenang. Jumlah genap (2, 4) bisa berakhir seri atau diputuskan dengan Super Tiebreak — dapat dikonfigurasi di layar pengaturan.</p>',
    'faq.classic.q3': 'Berapa game per set?',
    'faq.classic.a3': '<p>Set dapat dimainkan hingga 3, 4, 5, atau 6 game. Tim pertama yang mencapai target memenangkan set, sesuai aturan tiebreak yang dipilih.</p>',
    'faq.classic.q4': 'Apa saja aturan deuce?',
    'faq.classic.a4': `<p>Tiga opsi berlaku saat game mencapai 40–40:</p>
<ul>
  <li><strong>Golden Point</strong> — poin berikutnya langsung memenangkan game.</li>
  <li><strong>Advantage</strong> — tim harus memenangkan dua poin berturut-turut untuk meraih game.</li>
  <li><strong>Star Point</strong> — setelah dua deuce, game menjadi sudden death; poin berikutnya menang.</li>
</ul>`,
    'faq.classic.q5': 'Apa itu tiebreak?',
    'faq.classic.a5': `<p>Saat kedua tim mencapai skor set yang sama (misalnya 5–5 dalam set 6 game), tiebreak dimainkan — pertama mencapai 7 poin, menang dengan selisih 2.</p>
<p>Dua sub-aturan opsional tersedia saat Tiebreak dipilih:</p>
<ul>
  <li><strong>Short Set</strong> — tiebreak dimulai satu game lebih awal (misalnya 4–4 dalam set 6 game), dan tim yang menang mengambil set dengan selisih satu game (5–4).</li>
  <li><strong>Sudden Death</strong> — pada skor 6–6 di tiebreak, poin berikutnya menang tanpa memerlukan selisih 2 poin.</li>
</ul>`,
    'faq.classic.q6': 'Apa itu Super Tiebreak / Match Tiebreak?',
    'faq.classic.a6': `<p>Untuk format set genap (2 atau 4 set), jika set seri di akhir, Anda bisa memainkan Super Tiebreak untuk menentukan pertandingan — pertama mencapai 10 poin, menang dengan selisih 2. Sub-aturan Sudden Death opsional membuat poin pada 9–9 menjadi penentu.</p>
<p>Jika Anda tidak ingin melanjutkan, pilih <strong>No Margin</strong> dan pertandingan berakhir seri.</p>`,
    'faq.classic.q7': 'Apa itu Auto Change Ends?',
    'faq.classic.a7': '<p>Saat diaktifkan, aplikasi secara otomatis membalik tampilan sisi lapangan setelah setiap game dengan total ganjil dalam satu set — dan setiap 6 poin tiebreak — sesuai aturan rotasi padel standar. Pengumuman suara "Ganti sisi" diputar setiap pergantian.</p>',

    // Total Games Q&As
    'faq.totalgames.q1': 'Apa itu format Total Game?',
    'faq.totalgames.a1': '<p>Sejumlah game tetap dimainkan (3–9) tanpa set. Aturan deuce (Golden Point, Advantage, atau Star Point) tetap berlaku untuk setiap game. Tim yang memenangkan game terbanyak memenangkan pertandingan.</p>',
    'faq.totalgames.q2': 'Bisakah berakhir seri?',
    'faq.totalgames.a2': '<p>Ya — jumlah game genap (4, 6, 8) bisa berakhir seri jika kedua tim memenangkan jumlah game yang sama. Jumlah ganjil (3, 5, 7, 9) selalu menghasilkan pemenang.</p>',
    'faq.totalgames.q3': 'Apakah rotasi servis berlaku dalam Total Game?',
    'faq.totalgames.a3': '<p>Servis mengikuti pola game-per-game yang sama seperti Klasik — server bergantian setiap game, dan Anda bisa mengganti secara manual sebelum poin pertama atau melalui tombol aksesori.</p>',

    // Fixed Points Q&As
    'faq.fixedpoints.q1': 'Apa itu format Poin Tetap?',
    'faq.fixedpoints.a1': '<p>Setiap ketukan menghasilkan tepat satu poin mentah — tidak ada siklus 0 / 15 / 30 / 40, tidak ada game, dan tidak ada set. Total poin tetap dimainkan (16, 21, 24, atau 32). Tim dengan lebih banyak poin di akhir menang. Ini adalah format yang digunakan dalam padel Americano, di mana 21 poin adalah target yang paling umum.</p>',
    'faq.fixedpoints.q2': 'Bagaimana rotasi servis bekerja?',
    'faq.fixedpoints.a2': '<p>Servis berputar otomatis setiap N poin. Anda bisa mengatur N menjadi 1, 2, 3, 4, atau 5 — defaultnya adalah 2. Server saat ini ditunjukkan oleh indikator bola tenis di papan skor.</p>',
    'faq.fixedpoints.q3': 'Apa itu tiebreak di tengah pertandingan?',
    'faq.fixedpoints.a3': `<p>Untuk total poin genap (16, 24, 32), jika skor seri saat tepat setengah poin telah dimainkan, tiebreak bisa dipicu. Tiga opsi:</p>
<ul>
  <li><strong>No Margin</strong> — pertandingan berakhir seri.</li>
  <li><strong>Golden Point</strong> — satu poin sudden-death menentukan pertandingan.</li>
  <li><strong>Advantage</strong> — bermain terus hingga satu tim unggul 2 poin.</li>
</ul>
<p>Format 21 poin memiliki total ganjil dan tidak pernah memicu tiebreak.</p>`,

    // Accessories Q&As
    'faq.accessories.q1': 'Apa itu tombol Flic?',
    'faq.accessories.a1': `<p>Tombol Bluetooth Flic generasi pertama memungkinkan Anda mencetak skor tanpa tangan dari mana saja di lapangan. Pasangkan hingga 2 tombol dari layar Aksesori (memerlukan aplikasi Flic terinstal).</p>
<ul>
  <li><strong>Mode 1 tombol</strong> — klik tunggal: poin Tim 1; klik ganda: poin Tim 2; tahan: batalkan.</li>
  <li><strong>Mode 2 tombol</strong> — klik tunggal: poin untuk tim yang ditetapkan tombol tersebut; klik ganda: umumkan ulang skor; tahan: batalkan (atau ganti servis sebelum poin pertama).</li>
</ul>`,
    'faq.accessories.q2': 'Apa itu shutter remote?',
    'faq.accessories.a2': `<p>Remote shutter kamera Bluetooth (jenis yang digunakan sebagai klik selfie ponsel) terhubung sebagai perangkat keyboard HID. Infliction Point mendeteksi penekanan tombolnya dan memungkinkan Anda memetakan setiap tombol ke tindakan papan skor: cetak poin, batalkan, panggil fault, service let, rally let, out, umumkan ulang, atau putar suara kustom.</p>
<p>Konfigurasikan pemetaan dari <strong>Aksesori → Shutter Remote</strong>.</p>`,
    'faq.accessories.q3': 'Apa itu layar LED?',
    'faq.accessories.a3': `<p>Layar matrix LED kami terhubung melalui Bluetooth dan menampilkan skor langsung secara real time.</p>
<ul>
  <li>RGB 64×32 dengan warna tim, panah servis, dan animasi.</li>
</ul>
<p>Hubungkan dari <strong>Aksesori → Layar LED</strong>. Kecerahan dapat disesuaikan, dan pesan layar saat menunggu pertandingan dapat dikustomisasi.</p>`,
    'faq.accessories.q4': 'Bagaimana Chromecast bekerja?',
    'faq.accessories.a4': '<p>Ketuk ikon cast di <strong>Aksesori → Chromecast</strong> untuk terhubung ke TV berkemampuan Chromecast di jaringan yang sama. Papan skor layar penuh muncul di TV dan diperbarui langsung setiap poin dicetak.</p>',
    'faq.accessories.q5': 'Bagaimana aplikasi pendamping Wear OS bekerja?',
    'faq.accessories.a5': `<p>Instal Infliction Point di jam tangan Wear OS 3+ Anda dari Play Store. Aplikasi ini berpasangan otomatis dengan aplikasi ponsel melalui Wearable Data Layer — tidak perlu pengaturan manual.</p>
<p>Dari pergelangan tangan Anda bisa mencetak skor, membatalkan, mengganti servis, mengumumkan ulang, dan memicu pengumuman (fault, let, out, suara kustom). Jam tangan juga menampilkan halaman statistik pertandingan langsung dan bergetar pada peristiwa skor — denyut pendek untuk poin, lebih panjang untuk game dan set.</p>`,
    'faq.accessories.q6': 'Bisakah menggunakan beberapa aksesori sekaligus?',
    'faq.accessories.a6': '<p>Ya. Tombol Flic, shutter remote, layar LED, Chromecast, dan jam tangan Wear OS semuanya bekerja secara mandiri dan bersamaan. Masing-masing diperbarui dari status pertandingan yang sama.</p>',

    // Privacy page
    'priv.title': 'Kebijakan Privasi',
    'priv.updated': 'Terakhir diperbarui: 19 April 2026',
    'priv.h.collection': 'Pengumpulan Data',
    'priv.p.collection': 'Infliction Point tidak mengumpulkan, mengirimkan, atau berbagi data pribadi apa pun dengan server eksternal. Semua data hanya disimpan secara lokal di perangkat Anda.',
    'priv.h.history': 'Riwayat Pertandingan',
    'priv.p.history': 'Hasil pertandingan yang selesai disimpan secara lokal dalam database di perangkat (SQLite via Room) agar Anda dapat meninjau pertandingan sebelumnya. Data ini tidak pernah meninggalkan perangkat Anda dan dapat dihapus kapan saja dari dalam aplikasi.',
    'priv.h.players': 'Nama Pemain',
    'priv.p.players': 'Jika Anda menggunakan fitur penugasan pemain, nama yang Anda masukkan disimpan secara lokal dalam database di perangkat untuk kenyamanan (saran pengisian otomatis dan tampilan riwayat pertandingan). Nama pemain tidak pernah dikirimkan ke luar. Anda dapat menghapus pemain individu atau menghapus seluruh direktori dari dalam aplikasi.',
    'priv.h.wearable': 'Lapisan Data Wearable',
    'priv.p.wearable': 'Jika Anda menggunakan aplikasi pendamping Wear OS, status pertandingan disinkronkan antara ponsel dan jam tangan melalui API Wearable Data Layer Google. Data ini sepenuhnya berada di perangkat Anda dan tidak dikirim ke server eksternal mana pun.',
    'priv.h.thirdparty': 'Layanan Pihak Ketiga',
    'priv.p.thirdparty': 'Aplikasi menggunakan mesin Text-to-Speech bawaan Android untuk pengumuman skor. Tidak ada data yang dikirim ke 2an.dev atau server pihak ketiga mana pun.',
    'priv.h.bluetooth': 'Perangkat Bluetooth',
    'priv.p.bluetooth': 'Jika Anda memasangkan tombol Flic, alamat MAC-nya disimpan secara lokal di perangkat Anda dalam SharedPreferences untuk keperluan koneksi ulang. Jika Anda mengonfigurasi shutter remote Bluetooth, pemetaan tombol disimpan secara lokal. Tidak ada data perangkat Bluetooth yang dikirimkan ke luar.',
    'priv.h.changes': 'Perubahan pada Kebijakan Ini',
    'priv.p.changes': 'Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan tercermin di halaman ini dengan tanggal revisi yang diperbarui.',
    'priv.h.contact': 'Kontak',
    'priv.p.contact': 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',
  }
};

const SUPPORTED = ['en', 'id'];

function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'en';
  try { localStorage.setItem('lang', lang); } catch (_) {}
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const str = TRANSLATIONS[lang][el.dataset.i18n];
    if (str !== undefined) el.textContent = str;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const str = TRANSLATIONS[lang][el.dataset.i18nHtml];
    if (str !== undefined) el.innerHTML = str;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let saved;
  try { saved = localStorage.getItem('lang'); } catch (_) {}
  const browser = navigator.language.slice(0, 2).toLowerCase();
  const initial = SUPPORTED.includes(saved) ? saved
    : SUPPORTED.includes(browser) ? browser : 'en';
  setLanguage(initial);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});
