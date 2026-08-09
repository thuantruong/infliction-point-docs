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
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.instagram': 'Instagram',
    'footer.whatsapp': 'WhatsApp',

    // Delete Account
    'delacc.title': 'Delete Your Account',
    'delacc.updated': 'Last updated: August 2, 2026',
    'delacc.h.inapp': 'Delete From the App',
    'delacc.p.inapp': 'If you have the Infliction Point app installed and can sign in, open the app and go to Settings → Delete Account. This permanently removes your account from Firebase Authentication and erases your profile, including your profile photo, from our database. This action cannot be undone.',
    'delacc.h.data': 'What Gets Deleted',
    'delacc.p.data': 'Deleting your account removes your Firebase Authentication record and your profile data (name, username, gender, bio, and profile photo). Records of tournaments you took part in may be retained so other participants\' results and history stay intact, but your name is anonymized on those records once your account is deleted. Match history and player directory data saved locally on your device are not affected by account deletion and can be cleared separately from within the app.',
    'delacc.h.noaccess': "Can't Access the App?",
    'delacc.p.noaccess': 'If you\'ve uninstalled the app or lost access to your account, email us at <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a> from the address associated with your account and request deletion. We\'ll verify your request and delete your account and profile data within 30 days.',
    'delacc.h.contact': 'Contact',
    'delacc.p.contact': 'If you have questions about deleting your account, contact us at <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>. See our <a href="privacy.html">Privacy Policy</a> for more on how your data is handled.',

    // Hero
    'hero.headline': 'SCORE SMARTER.<br><span class="accent">ELEVATE THE GAME.</span>',
    'hero.tagline1': 'TAP',
    'hero.tagline2': 'SCORE',
    'hero.tagline3': 'PLAY',
    'hero.body': 'Tap with your phone, watch, or a remote.<br>See scores on an LED display or TV.<br>Stay in the game flow.',
    'hero.cta': 'Get it on Google Play',

    // Features
    'features.heading': 'Everything you need on court',
    'features.sub': 'Score, announce, display, and track - without interrupting the game.',
    'feat.tap.title': 'Tap to Score',
    'feat.tap.body': 'Full-screen split layout. Tap your team\'s half to award a point. Blue vs orange - impossible to miss. Made a mistake? Undo it.',
    'feat.handsfree.title': 'Hands-Free Scoring',
    'feat.handsfree.body': 'Pair a Bluetooth shutter remote or up to 2 Flic buttons. Score, undo, call faults, and switch serve without touching the phone. Auto change ends swaps court sides at the right moment.',
    'feat.umpire.title': 'Your Personal Courtside Umpire',
    'feat.umpire.body': 'TTS announces every point, game, set, and match. Call faults, lets, and outs from the Say panel. English, German, and Indonesian - configurable language, voice, and speed. 4 custom sound slots with file picker and in-app recorder.',
    'feat.players.title': 'Put Names to the Game',
    'feat.players.body': 'Assign players to each team before every match. Persistent directory with recency and frequency suggestions. Player names appear on the scoreboard, in announcements, and on displays.',
    'feat.stats.title': 'Match Stats & History',
    'feat.stats.body': 'Tap the center overlay for set-by-set scores, serving info, and match duration. Every completed match saved - date-grouped history with full set breakdowns.',
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
    'fmt.fixedpoint.sub': 'Americano-style scoring. Each tap is one point - no 15/30/40, just a race to the target.',
    'fmt.fixedpoint.li1': '16, 21, 24, or 32 points',
    'fmt.fixedpoint.li2': 'Configurable serve rotation',
    'fmt.fixedpoint.li3': 'Tiebreak rules for even totals',

    // Download
    'download.cta': 'Get it on Google Play',
    'download.ios': 'Use it on iOS',
    'download.desktop': 'Use it on Desktop',

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
    'faq.classic.a2': '<p>You can choose best of 1, 2, 3, 4, or 5 sets. Odd totals (1, 3, 5) always produce a winner. Even totals (2, 4) can end in a tie or be decided with a Super Tiebreak - configurable in the setup screen.</p>',
    'faq.classic.q3': 'How many games per set?',
    'faq.classic.a3': '<p>Sets can be played to 3, 4, 5, or 6 games. The first team to reach the target wins the set, subject to the tiebreak rule you\'ve chosen.</p>',
    'faq.classic.q4': 'What are the deuce rules?',
    'faq.classic.a4': `<p>Three options apply when a game reaches 40–40:</p>
<ul>
  <li><strong>Golden Point</strong> - the next point wins the game outright.</li>
  <li><strong>Advantage</strong> - a team must win two consecutive points to take the game.</li>
  <li><strong>Star Point</strong> - after two deuces the game becomes sudden death; the next point wins.</li>
</ul>`,
    'faq.classic.q5': 'What is a tiebreak?',
    'faq.classic.a5': `<p>When both teams reach a set-score tie (e.g. 6–6 in a 6-game set), a tiebreak is played - first to 7 points, win by 2.</p>
<p>Two optional sub-rules are available when Tiebreak is selected:</p>
<ul>
  <li><strong>Short Set</strong> - the tiebreak triggers one game earlier (e.g. 5–5 in a 6-game set), and the winning team takes the set by one game (6–5).</li>
  <li><strong>Sudden Death</strong> - at 6–6 in the tiebreak, the next point wins instead of requiring a 2-point lead.</li>
</ul>`,
    'faq.classic.q6': 'What is a Super Tiebreak / Match Tiebreak?',
    'faq.classic.a6': `<p>For even-set formats (2 or 4 sets), if sets are tied at the end you can play a Super Tiebreak to decide the match - first to 10 points, win by 2. An optional Sudden Death sub-rule makes the point at 9–9 decisive.</p>
<p>If you prefer not to play on, choose <strong>No Margin</strong> instead and the match ends in a draw.</p>`,
    'faq.classic.q7': 'What is Auto Change Ends?',
    'faq.classic.a7': '<p>When enabled, the app automatically flips the court-side display after every odd-total game in a set - and every 6 tiebreak points - matching the standard padel rotation rule. A "Change ends" voice announcement plays at each swap.</p>',

    // Total Games Q&As
    'faq.totalgames.q1': 'What is Total Games format?',
    'faq.totalgames.a1': '<p>A fixed number of games is played (3–9) with no sets. Deuce rules (Golden Point, Advantage, or Star Point) still apply to each individual game. The team that wins the most games wins the match.</p>',
    'faq.totalgames.q2': 'Can it end in a draw?',
    'faq.totalgames.a2': '<p>Yes - even-game totals (4, 6, 8) can end in a draw if both teams win the same number of games. Odd totals (3, 5, 7, 9) always produce a winner.</p>',
    'faq.totalgames.q3': 'Does serve rotation work in Total Games?',
    'faq.totalgames.a3': '<p>Serve follows the same game-by-game pattern as Classic - the server alternates each game, and you can switch manually before the first point or via an accessory button.</p>',

    // Fixed Points Q&As
    'faq.fixedpoints.q1': 'What is Fixed Points format?',
    'faq.fixedpoints.a1': '<p>Each tap scores exactly one raw point - there\'s no 0 / 15 / 30 / 40 cycle, no games, and no sets. A fixed total of points is played (16, 21, 24, or 32). The team with more points at the end wins. This is the format used in Americano padel, where 21 points is the most common target.</p>',
    'faq.fixedpoints.q2': 'How does serve rotation work?',
    'faq.fixedpoints.a2': '<p>Serve rotates automatically every N points. You can set N to 1, 2, 3, 4, or 5 - the default is 2. The current server is shown by a tennis-ball indicator on the scoreboard.</p>',
    'faq.fixedpoints.q3': 'What is the tiebreak at halfway?',
    'faq.fixedpoints.a3': `<p>For even-point totals (16, 24, 32), if scores are tied when exactly half the points have been played, a tiebreak can be triggered. Three options:</p>
<ul>
  <li><strong>No Margin</strong> - the match ends in a draw.</li>
  <li><strong>Golden Point</strong> - one sudden-death point decides the match.</li>
  <li><strong>Advantage</strong> - play continues until one team leads by 2 points.</li>
</ul>
<p>The 21-point format has an odd total and never triggers a tiebreak.</p>`,

    // Accessories Q&As
    'faq.accessories.q1': 'What are Flic buttons?',
    'faq.accessories.a1': `<p>First-generation Flic Bluetooth buttons let you score hands-free from anywhere on the court. Pair up to 2 buttons from the Accessories screen (requires the Flic app to be installed).</p>
<ul>
  <li><strong>1-button mode</strong> - single click: Team 1 point; double click: Team 2 point; hold: undo.</li>
  <li><strong>2-button mode</strong> - single click: point for that button's assigned team; double click: reannounce score; hold: undo (or switch serve before the first point).</li>
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
    'faq.accessories.a5': `<p>Install Infliction Point on your Wear OS 3+ watch from the Play Store. It pairs automatically with the phone app over the Wearable Data Layer - no manual setup needed.</p>
<p>From your wrist you can score, undo, switch serve, reannounce, and trigger announcements (fault, let, out, custom sounds). The watch also shows a live match stats page and vibrates on scoring events - short pulse for points, longer for games and sets.</p>`,
    'faq.accessories.q6': 'Can I use multiple accessories at the same time?',
    'faq.accessories.a6': '<p>Yes. Flic buttons, shutter remotes, the LED display, Chromecast, and the Wear OS watch all work independently and simultaneously. Each updates from the same match state.</p>',

    // Privacy page
    'priv.title': 'Privacy Policy',
    'priv.updated': 'Last updated: August 1, 2026',
    'priv.h.collection': 'Data Collection',
    'priv.p.collection': 'Scoring a Quick Match, viewing match history, and using saved player suggestions all work entirely on your device, without an account or an internet connection. If you choose to sign in and use the optional Play features (tournaments and profiles), some data is sent to our servers as described below.',
    'priv.h.account': 'Account & Sign-In',
    'priv.p.account': 'Signing in is optional. If you sign in with Google, we use Firebase Authentication, a Google service, to manage your account. Your email address and a unique account ID are stored by Firebase on our behalf and used to identify you across the app and its companion web app. You can sign out at any time from Settings.',
    'priv.h.profile': 'Profile Data',
    'priv.p.profile': 'If you set up a profile, the name, username, gender, bio, and profile photo you provide are stored on our servers so they can be shown to other players in tournaments you take part in. You can view, edit, or remove this information at any time from the Profile screen.',
    'priv.h.tournaments': 'Tournaments & Live Scoring',
    'priv.p.tournaments': 'If you create or join a tournament, the tournament\'s details, player roster, and match schedule are stored on our servers so they can be shared with the organizer and other participants. When a match from a tournament is scored on the app\'s scoreboard, the live score and point-by-point history are synced to our servers in real time so results are visible to other participants and organizers. This data stays associated with the tournament and is not shared outside it.',
    'priv.h.screens': 'Screen Templates & Displays',
    'priv.p.screens': 'If you create a screen template to display on a paired TV or screen at a tournament, the template\'s name, layout configuration, and any images you upload are stored on our servers so they can be rendered on paired screens. Pairing a physical screen links it to your tournament using a short-lived pairing code. You can delete templates and their images, and unpair screens, at any time.',
    'priv.h.history': 'Match History',
    'priv.p.history': 'Results from a Quick Match (started from the Setup screen, not part of a tournament) are saved locally in an on-device database so you can review past matches. This data never leaves your device and can be deleted at any time from within the app. Tournament matches are covered separately above, under "Tournaments & Live Scoring".',
    'priv.h.players': 'Player Names',
    'priv.p.players': 'If you use the player assignment feature for a Quick Match, the names you enter are stored locally in an on-device directory for convenience (autofill suggestions and match history display) and are never transmitted externally. You can delete individual players or clear the entire directory from within the app. Players added to a tournament roster are handled as described above, under "Tournaments & Live Scoring".',
    'priv.h.photos': 'Camera & Photos',
    'priv.p.photos': 'Setting a profile photo may request camera access so you can take a new photo to upload; the photo is only sent to our servers if you choose to save it to your profile. When you save or share an image from the tournament leaderboard, it\'s written to your device\'s photo gallery or handed to the share sheet you pick - that stays on-device and under your control. Infliction Point does not otherwise access photos on your device.',
    'priv.h.location': 'Location',
    'priv.p.location': 'If you search for nearby tournaments in Play, the app requests your device\'s location and sends it to our servers to find tournaments near you. Location is used only to serve that search and is not stored or attached to your profile. Location access is entirely optional - the app works fully without it.',
    'priv.h.wearable': 'Wearable Data Layer',
    'priv.p.wearable': 'If you use the Wear OS companion app, match state is synced between your phone and watch via Google\'s Wearable Data Layer API. This data stays entirely on your devices and is not sent to any external server.',
    'priv.h.thirdparty': 'Third-Party Services',
    'priv.p.thirdparty': 'The app uses Android\'s built-in Text-to-Speech engine for score announcements - nothing is sent anywhere for this. Optional features rely on other Google services: Firebase Authentication and Cloud Storage (accounts, profiles, and profile photos), Google Cast (sending live scores to a Chromecast-connected TV on your local network), and Google Play In-App Updates (checking for and installing app updates). Each of these is also governed by Google\'s own privacy policy. No advertising or analytics SDKs are used, and no data is sold.',
    'priv.h.bluetooth': 'Bluetooth Devices',
    'priv.p.bluetooth': 'If you pair a Flic button, its MAC address is stored locally on your device in SharedPreferences for reconnection purposes. If you configure a Bluetooth shutter remote, key mappings are stored locally. No Bluetooth device data is transmitted externally.',
    'priv.h.retention': 'Data Retention & Account Deletion',
    'priv.p.retention': 'Account and profile data is kept for as long as your account exists. You can permanently delete your account at any time from Settings → Delete Account, which removes your account from Firebase Authentication and erases your profile, including your profile photo, from our database. Records of tournaments you took part in may be retained so other participants\' results and history stay intact, but your name is anonymized on those records once your account is deleted.',
    'priv.h.children': 'Children\'s Privacy',
    'priv.p.children': 'Infliction Point is not directed at children under 13, and we do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us at the address below and we will delete it.',
    'priv.h.changes': 'Changes to This Policy',
    'priv.p.changes': 'We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.',
    'priv.h.contact': 'Contact',
    'priv.p.contact': 'If you have questions about this privacy policy, contact us at <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',

    // Terms of Service page
    'terms.title': 'Terms of Service',
    'terms.updated': 'Last updated: August 1, 2026',
    'terms.p.intro': 'These Terms of Service ("Terms") govern your use of Infliction Point, including the Android app, the Wear OS companion app, and the companion web app ("the Service"), provided by 2an.dev ("we", "us"). By downloading, installing, or using the Service, you agree to these Terms. If you don\'t agree, please don\'t use the Service.',
    'terms.h.eligibility': 'Eligibility',
    'terms.p.eligibility': 'The Service is not directed at children under 13, and you must meet the minimum age required in your country to use it. If you create an account, you\'re responsible for the accuracy of the information you provide and for keeping your account secure.',
    'terms.h.license': 'License to Use',
    'terms.p.license': 'We grant you a personal, non-exclusive, non-transferable, revocable license to use the Service for scoring and organizing padel matches. You may not reverse-engineer, resell, or use the Service for any unlawful purpose.',
    'terms.h.accounts': 'Accounts & Tournaments',
    'terms.p.accounts': 'Signing in is optional and unlocks additional features such as profiles and tournaments. If you create or organize a tournament, you\'re responsible for the accuracy of the information you enter (player rosters, scores, schedules) and for how you conduct the event. Other participants can see tournament data you share with them, as described in our <a href="privacy.html">Privacy Policy</a>.',
    'terms.h.content': 'User Content',
    'terms.p.content': 'You retain ownership of the content you provide (profile info, photos, player names, tournament data). By submitting content, you grant us a limited license to store and display it back to you and to other participants as needed to operate the Service (e.g. showing your name and score to other players in a tournament). You\'re responsible for making sure you have the right to submit any content you upload, including photos.',
    'terms.h.conduct': 'Acceptable Use',
    'terms.p.conduct': 'Don\'t use the Service to upload unlawful, abusive, or infringing content, impersonate others, interfere with the Service\'s operation, or attempt to access accounts or data that aren\'t yours.',
    'terms.h.thirdparty': 'Third-Party Services',
    'terms.p.thirdparty': 'The Service relies on third-party platforms - Google Play Services, Firebase, Google Cast, and the Android Text-to-Speech engine - to provide certain features. Your use of those platforms is also subject to their own terms. We\'re not responsible for the availability or behavior of third-party services outside our control.',
    'terms.h.availability': 'Availability & Changes',
    'terms.p.availability': 'The Service is currently provided free of charge. We may add, change, or remove features, or suspend or discontinue the Service (or parts of it, such as tournament sync), at any time. Local features (Quick Match scoring, match history, and player suggestions stored on your device) are designed to keep working without a connection to our servers, but we don\'t guarantee uninterrupted or error-free operation of any part of the Service. Online features that rely on our servers (such as accounts, profiles, and tournaments) are free today, but we may introduce pricing, subscriptions, or usage limits for some or all of them in the future; if we do, we\'ll give notice and no existing feature will start charging you without your consent.',
    'terms.h.termination': 'Termination',
    'terms.p.termination': 'You can stop using the Service and delete your account at any time from Settings → Delete Account. We may suspend or terminate access to accounts that violate these Terms.',
    'terms.h.disclaimer': 'Disclaimer of Warranties',
    'terms.p.disclaimer': 'The Service is provided "as is" and "as available," without warranties of any kind, express or implied. We don\'t warrant that scoring, match results, or synced data will always be accurate or available - Infliction Point is a scoring aid, not an official match record for competitive or sanctioned play unless the tournament organizer says otherwise.',
    'terms.h.liability': 'Limitation of Liability',
    'terms.p.liability': 'To the maximum extent permitted by law, 2an.dev is not liable for any indirect, incidental, or consequential damages arising from your use of the Service, including loss of match data, disputes over match results, or issues with connected hardware (Flic buttons, shutter remotes, LED displays, paired screens, or Wear OS devices).',
    'terms.h.changes': 'Changes to These Terms',
    'terms.p.changes': 'We may update these Terms from time to time. Continued use of the Service after a change means you accept the updated Terms. Material changes will be reflected on this page with an updated revision date.',
    'terms.h.contact': 'Contact',
    'terms.p.contact': 'If you have questions about these Terms, contact us at <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',
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
    'footer.terms': 'Ketentuan Layanan',
    'footer.contact': 'Kontak',
    'footer.instagram': 'Instagram',
    'footer.whatsapp': 'WhatsApp',

    // Delete Account
    'delacc.title': 'Hapus Akun Anda',
    'delacc.updated': 'Terakhir diperbarui: 2 Agustus 2026',
    'delacc.h.inapp': 'Hapus Melalui Aplikasi',
    'delacc.p.inapp': 'Jika Anda memiliki aplikasi Infliction Point terpasang dan dapat masuk, buka aplikasi lalu buka Setelan → Hapus Akun. Ini akan menghapus akun Anda secara permanen dari Firebase Authentication dan menghapus profil Anda, termasuk foto profil, dari database kami. Tindakan ini tidak dapat dibatalkan.',
    'delacc.h.data': 'Apa yang Dihapus',
    'delacc.p.data': 'Menghapus akun Anda akan menghapus catatan Firebase Authentication dan data profil Anda (nama, username, gender, bio, dan foto profil). Catatan turnamen yang pernah Anda ikuti mungkin tetap disimpan agar hasil dan riwayat peserta lain tetap utuh, tetapi nama Anda dianonimkan pada catatan tersebut setelah akun dihapus. Riwayat pertandingan dan direktori pemain yang tersimpan secara lokal di perangkat Anda tidak terpengaruh oleh penghapusan akun dan dapat dihapus secara terpisah dari dalam aplikasi.',
    'delacc.h.noaccess': 'Tidak Bisa Mengakses Aplikasi?',
    'delacc.p.noaccess': 'Jika Anda sudah mencopot pemasangan aplikasi atau kehilangan akses ke akun Anda, kirim email ke <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a> dari alamat yang terhubung dengan akun Anda dan minta penghapusan. Kami akan memverifikasi permintaan Anda dan menghapus akun serta data profil Anda dalam waktu 30 hari.',
    'delacc.h.contact': 'Kontak',
    'delacc.p.contact': 'Jika Anda memiliki pertanyaan tentang penghapusan akun, hubungi kami di <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>. Lihat <a href="privacy.html">Kebijakan Privasi</a> kami untuk info lebih lanjut tentang bagaimana data Anda ditangani.',

    // Hero
    'hero.headline': 'SCORE SMARTER.<br><span class="accent">ELEVATE THE GAME.</span>',
    'hero.tagline1': 'TAP',
    'hero.tagline2': 'SCORE',
    'hero.tagline3': 'PLAY',
    'hero.body': 'Ketuk dengan ponsel, jam tangan, atau remote.<br>Lihat skor di layar LED atau TV.<br>Tetap fokus dalam permainan.',
    'hero.cta': 'Unduh di Google Play',

    // Features
    'features.heading': 'Semua yang Anda butuhkan di lapangan',
    'features.sub': 'Skor, umumkan, tampilkan, dan catat - tanpa mengganggu permainan.',
    'feat.tap.title': 'Ketuk untuk Skor',
    'feat.tap.body': 'Tata letak layar penuh. Ketuk bagian tim Anda untuk memberi poin. Biru vs oranye - tak mungkin terlewat. Salah ketuk? Batalkan.',
    'feat.handsfree.title': 'Skor Tanpa Tangan',
    'feat.handsfree.body': 'Pasangkan remote shutter Bluetooth atau hingga 2 tombol Flic. Cetak skor, batalkan, panggil fault, dan ganti servis tanpa menyentuh ponsel. Pergantian sisi otomatis membalik posisi lapangan di waktu yang tepat.',
    'feat.umpire.title': 'Wasit Pribadi di Pinggir Lapangan',
    'feat.umpire.body': 'TTS mengumumkan setiap poin, game, set, dan pertandingan. Panggil fault, let, dan out dari panel Say. Bahasa Inggris, Jerman, dan Indonesia - bahasa, suara, dan kecepatan dapat dikonfigurasi. 4 slot suara kustom dengan pemilih file dan perekam dalam aplikasi.',
    'feat.players.title': 'Beri Nama pada Pertandingan',
    'feat.players.body': 'Tetapkan pemain ke setiap tim sebelum pertandingan. Direktori persisten dengan saran berdasarkan recency dan frekuensi. Nama pemain tampil di papan skor, pengumuman, dan layar.',
    'feat.stats.title': 'Statistik & Riwayat Pertandingan',
    'feat.stats.body': 'Ketuk overlay tengah untuk skor per set, info servis, dan durasi pertandingan. Setiap pertandingan yang selesai tersimpan - riwayat berdasarkan tanggal dengan rincian set lengkap.',
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
    'fmt.fixedpoint.sub': 'Skor gaya Americano. Setiap ketukan satu poin - tanpa 15/30/40, hanya lomba ke target.',
    'fmt.fixedpoint.li1': '16, 21, 24, atau 32 poin',
    'fmt.fixedpoint.li2': 'Rotasi servis yang dapat dikonfigurasi',
    'fmt.fixedpoint.li3': 'Aturan tiebreak untuk total genap',

    // Download
    'download.cta': 'Unduh di Google Play',
    'download.ios': 'Gunakan di iOS',
    'download.desktop': 'Gunakan di Desktop',

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
    'faq.classic.a2': '<p>Anda dapat memilih best of 1, 2, 3, 4, atau 5 set. Jumlah ganjil (1, 3, 5) selalu menghasilkan pemenang. Jumlah genap (2, 4) bisa berakhir seri atau diputuskan dengan Super Tiebreak - dapat dikonfigurasi di layar pengaturan.</p>',
    'faq.classic.q3': 'Berapa game per set?',
    'faq.classic.a3': '<p>Set dapat dimainkan hingga 3, 4, 5, atau 6 game. Tim pertama yang mencapai target memenangkan set, sesuai aturan tiebreak yang dipilih.</p>',
    'faq.classic.q4': 'Apa saja aturan deuce?',
    'faq.classic.a4': `<p>Tiga opsi berlaku saat game mencapai 40–40:</p>
<ul>
  <li><strong>Golden Point</strong> - poin berikutnya langsung memenangkan game.</li>
  <li><strong>Advantage</strong> - tim harus memenangkan dua poin berturut-turut untuk meraih game.</li>
  <li><strong>Star Point</strong> - setelah dua deuce, game menjadi sudden death; poin berikutnya menang.</li>
</ul>`,
    'faq.classic.q5': 'Apa itu tiebreak?',
    'faq.classic.a5': `<p>Saat kedua tim mencapai skor set yang sama (misalnya 6–6 dalam set 6 game), tiebreak dimainkan - pertama mencapai 7 poin, menang dengan selisih 2.</p>
<p>Dua sub-aturan opsional tersedia saat Tiebreak dipilih:</p>
<ul>
  <li><strong>Short Set</strong> - tiebreak dimulai satu game lebih awal (misalnya 5–5 dalam set 6 game), dan tim yang menang mengambil set dengan selisih satu game (6–5).</li>
  <li><strong>Sudden Death</strong> - pada skor 6–6 di tiebreak, poin berikutnya menang tanpa memerlukan selisih 2 poin.</li>
</ul>`,
    'faq.classic.q6': 'Apa itu Super Tiebreak / Match Tiebreak?',
    'faq.classic.a6': `<p>Untuk format set genap (2 atau 4 set), jika set seri di akhir, Anda bisa memainkan Super Tiebreak untuk menentukan pertandingan - pertama mencapai 10 poin, menang dengan selisih 2. Sub-aturan Sudden Death opsional membuat poin pada 9–9 menjadi penentu.</p>
<p>Jika Anda tidak ingin melanjutkan, pilih <strong>No Margin</strong> dan pertandingan berakhir seri.</p>`,
    'faq.classic.q7': 'Apa itu Auto Change Ends?',
    'faq.classic.a7': '<p>Saat diaktifkan, aplikasi secara otomatis membalik tampilan sisi lapangan setelah setiap game dengan total ganjil dalam satu set - dan setiap 6 poin tiebreak - sesuai aturan rotasi padel standar. Pengumuman suara "Ganti sisi" diputar setiap pergantian.</p>',

    // Total Games Q&As
    'faq.totalgames.q1': 'Apa itu format Total Game?',
    'faq.totalgames.a1': '<p>Sejumlah game tetap dimainkan (3–9) tanpa set. Aturan deuce (Golden Point, Advantage, atau Star Point) tetap berlaku untuk setiap game. Tim yang memenangkan game terbanyak memenangkan pertandingan.</p>',
    'faq.totalgames.q2': 'Bisakah berakhir seri?',
    'faq.totalgames.a2': '<p>Ya - jumlah game genap (4, 6, 8) bisa berakhir seri jika kedua tim memenangkan jumlah game yang sama. Jumlah ganjil (3, 5, 7, 9) selalu menghasilkan pemenang.</p>',
    'faq.totalgames.q3': 'Apakah rotasi servis berlaku dalam Total Game?',
    'faq.totalgames.a3': '<p>Servis mengikuti pola game-per-game yang sama seperti Klasik - server bergantian setiap game, dan Anda bisa mengganti secara manual sebelum poin pertama atau melalui tombol aksesori.</p>',

    // Fixed Points Q&As
    'faq.fixedpoints.q1': 'Apa itu format Poin Tetap?',
    'faq.fixedpoints.a1': '<p>Setiap ketukan menghasilkan tepat satu poin mentah - tidak ada siklus 0 / 15 / 30 / 40, tidak ada game, dan tidak ada set. Total poin tetap dimainkan (16, 21, 24, atau 32). Tim dengan lebih banyak poin di akhir menang. Ini adalah format yang digunakan dalam padel Americano, di mana 21 poin adalah target yang paling umum.</p>',
    'faq.fixedpoints.q2': 'Bagaimana rotasi servis bekerja?',
    'faq.fixedpoints.a2': '<p>Servis berputar otomatis setiap N poin. Anda bisa mengatur N menjadi 1, 2, 3, 4, atau 5 - defaultnya adalah 2. Server saat ini ditunjukkan oleh indikator bola tenis di papan skor.</p>',
    'faq.fixedpoints.q3': 'Apa itu tiebreak di tengah pertandingan?',
    'faq.fixedpoints.a3': `<p>Untuk total poin genap (16, 24, 32), jika skor seri saat tepat setengah poin telah dimainkan, tiebreak bisa dipicu. Tiga opsi:</p>
<ul>
  <li><strong>No Margin</strong> - pertandingan berakhir seri.</li>
  <li><strong>Golden Point</strong> - satu poin sudden-death menentukan pertandingan.</li>
  <li><strong>Advantage</strong> - bermain terus hingga satu tim unggul 2 poin.</li>
</ul>
<p>Format 21 poin memiliki total ganjil dan tidak pernah memicu tiebreak.</p>`,

    // Accessories Q&As
    'faq.accessories.q1': 'Apa itu tombol Flic?',
    'faq.accessories.a1': `<p>Tombol Bluetooth Flic generasi pertama memungkinkan Anda mencetak skor tanpa tangan dari mana saja di lapangan. Pasangkan hingga 2 tombol dari layar Aksesori (memerlukan aplikasi Flic terinstal).</p>
<ul>
  <li><strong>Mode 1 tombol</strong> - klik tunggal: poin Tim 1; klik ganda: poin Tim 2; tahan: batalkan.</li>
  <li><strong>Mode 2 tombol</strong> - klik tunggal: poin untuk tim yang ditetapkan tombol tersebut; klik ganda: umumkan ulang skor; tahan: batalkan (atau ganti servis sebelum poin pertama).</li>
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
    'faq.accessories.a5': `<p>Instal Infliction Point di jam tangan Wear OS 3+ Anda dari Play Store. Aplikasi ini berpasangan otomatis dengan aplikasi ponsel melalui Wearable Data Layer - tidak perlu pengaturan manual.</p>
<p>Dari pergelangan tangan Anda bisa mencetak skor, membatalkan, mengganti servis, mengumumkan ulang, dan memicu pengumuman (fault, let, out, suara kustom). Jam tangan juga menampilkan halaman statistik pertandingan langsung dan bergetar pada peristiwa skor - denyut pendek untuk poin, lebih panjang untuk game dan set.</p>`,
    'faq.accessories.q6': 'Bisakah menggunakan beberapa aksesori sekaligus?',
    'faq.accessories.a6': '<p>Ya. Tombol Flic, shutter remote, layar LED, Chromecast, dan jam tangan Wear OS semuanya bekerja secara mandiri dan bersamaan. Masing-masing diperbarui dari status pertandingan yang sama.</p>',

    // Privacy page
    'priv.title': 'Kebijakan Privasi',
    'priv.updated': 'Terakhir diperbarui: 1 Agustus 2026',
    'priv.h.collection': 'Pengumpulan Data',
    'priv.p.collection': 'Mencatat skor Quick Match, melihat riwayat pertandingan, dan menggunakan saran nama pemain tersimpan semuanya berjalan sepenuhnya di perangkat Anda, tanpa akun atau koneksi internet. Jika Anda memilih masuk (sign in) dan menggunakan fitur Play opsional (turnamen dan profil), sebagian data dikirim ke server kami seperti dijelaskan di bawah.',
    'priv.h.account': 'Akun & Masuk',
    'priv.p.account': 'Masuk (sign in) bersifat opsional. Jika Anda masuk dengan Google, kami menggunakan Firebase Authentication, layanan dari Google, untuk mengelola akun Anda. Alamat email dan ID akun unik Anda disimpan oleh Firebase atas nama kami dan digunakan untuk mengidentifikasi Anda di aplikasi maupun aplikasi web pendampingnya. Anda dapat keluar (sign out) kapan saja dari Settings.',
    'priv.h.profile': 'Data Profil',
    'priv.p.profile': 'Jika Anda membuat profil, nama, username, gender, bio, dan foto profil yang Anda masukkan disimpan di server kami agar dapat ditampilkan kepada pemain lain dalam turnamen yang Anda ikuti. Anda dapat melihat, mengubah, atau menghapus data ini kapan saja dari layar Profile.',
    'priv.h.tournaments': 'Turnamen & Skor Langsung',
    'priv.p.tournaments': 'Jika Anda membuat atau bergabung dengan turnamen, detail turnamen, daftar pemain, dan jadwal pertandingan disimpan di server kami agar dapat dibagikan kepada penyelenggara dan peserta lain. Saat pertandingan dari sebuah turnamen dicatat di papan skor aplikasi, skor langsung dan riwayat poin-demi-poin disinkronkan ke server kami secara real-time agar hasilnya dapat dilihat peserta dan penyelenggara lain. Data ini tetap terkait dengan turnamen tersebut dan tidak dibagikan ke luar turnamen.',
    'priv.h.screens': 'Template Layar & Tampilan',
    'priv.p.screens': 'Jika Anda membuat template layar untuk ditampilkan di TV atau layar yang dipasangkan pada sebuah turnamen, nama template, konfigurasi tata letak, dan gambar apa pun yang Anda unggah disimpan di server kami agar dapat ditampilkan di layar yang dipasangkan. Memasangkan layar fisik menghubungkannya dengan turnamen Anda menggunakan kode pemasangan berumur pendek. Anda dapat menghapus template beserta gambarnya, dan melepas pasangan layar, kapan saja.',
    'priv.h.history': 'Riwayat Pertandingan',
    'priv.p.history': 'Hasil Quick Match (dimulai dari layar Setup, bukan bagian dari turnamen) disimpan secara lokal dalam database di perangkat agar Anda dapat meninjau pertandingan sebelumnya. Data ini tidak pernah meninggalkan perangkat Anda dan dapat dihapus kapan saja dari dalam aplikasi. Pertandingan turnamen dibahas terpisah di atas, pada bagian "Turnamen & Skor Langsung".',
    'priv.h.players': 'Nama Pemain',
    'priv.p.players': 'Jika Anda menggunakan fitur penugasan pemain untuk Quick Match, nama yang Anda masukkan disimpan secara lokal dalam direktori di perangkat untuk kenyamanan (saran pengisian otomatis dan tampilan riwayat pertandingan) dan tidak pernah dikirimkan ke luar. Anda dapat menghapus pemain individu atau menghapus seluruh direktori dari dalam aplikasi. Pemain yang ditambahkan ke daftar turnamen ditangani seperti dijelaskan di atas, pada bagian "Turnamen & Skor Langsung".',
    'priv.h.photos': 'Kamera & Foto',
    'priv.p.photos': 'Mengatur foto profil dapat meminta akses kamera agar Anda dapat mengambil foto baru untuk diunggah; foto hanya dikirim ke server kami jika Anda memilih menyimpannya ke profil Anda. Saat Anda menyimpan atau membagikan gambar dari leaderboard turnamen, gambar ditulis ke galeri foto perangkat Anda atau diserahkan ke share sheet pilihan Anda - ini tetap berada di perangkat dan sepenuhnya dalam kendali Anda. Infliction Point tidak mengakses foto di perangkat Anda selain itu.',
    'priv.h.location': 'Lokasi',
    'priv.p.location': 'Jika Anda mencari turnamen terdekat di Play, aplikasi meminta lokasi perangkat Anda dan mengirimkannya ke server kami untuk menemukan turnamen di sekitar Anda. Lokasi hanya digunakan untuk pencarian tersebut dan tidak disimpan atau dikaitkan dengan profil Anda. Akses lokasi sepenuhnya opsional - aplikasi tetap berfungsi penuh tanpanya.',
    'priv.h.wearable': 'Lapisan Data Wearable',
    'priv.p.wearable': 'Jika Anda menggunakan aplikasi pendamping Wear OS, status pertandingan disinkronkan antara ponsel dan jam tangan melalui API Wearable Data Layer Google. Data ini sepenuhnya berada di perangkat Anda dan tidak dikirim ke server eksternal mana pun.',
    'priv.h.thirdparty': 'Layanan Pihak Ketiga',
    'priv.p.thirdparty': 'Aplikasi menggunakan mesin Text-to-Speech bawaan Android untuk pengumuman skor - tidak ada data yang dikirim ke mana pun untuk ini. Fitur opsional bergantung pada layanan Google lain: Firebase Authentication dan Cloud Storage (akun, profil, dan foto profil), Google Cast (mengirim skor langsung ke TV yang terhubung Chromecast di jaringan lokal Anda), dan Google Play In-App Updates (memeriksa dan memasang pembaruan aplikasi). Masing-masing juga tunduk pada kebijakan privasi Google sendiri. Tidak ada SDK iklan atau analitik yang digunakan, dan data tidak dijual.',
    'priv.h.bluetooth': 'Perangkat Bluetooth',
    'priv.p.bluetooth': 'Jika Anda memasangkan tombol Flic, alamat MAC-nya disimpan secara lokal di perangkat Anda dalam SharedPreferences untuk keperluan koneksi ulang. Jika Anda mengonfigurasi shutter remote Bluetooth, pemetaan tombol disimpan secara lokal. Tidak ada data perangkat Bluetooth yang dikirimkan ke luar.',
    'priv.h.retention': 'Retensi Data & Penghapusan Akun',
    'priv.p.retention': 'Data akun dan profil disimpan selama akun Anda masih ada. Anda dapat menghapus akun secara permanen kapan saja dari Settings → Delete Account, yang menghapus akun Anda dari Firebase Authentication dan menghapus profil Anda, termasuk foto profil, dari database kami. Catatan turnamen yang pernah Anda ikuti dapat tetap disimpan agar hasil dan riwayat peserta lain tetap utuh, tetapi nama Anda dianonimkan pada catatan tersebut setelah akun Anda dihapus.',
    'priv.h.children': 'Privasi Anak',
    'priv.p.children': 'Infliction Point tidak ditujukan untuk anak di bawah 13 tahun, dan kami tidak secara sengaja mengumpulkan data pribadi dari anak-anak. Jika Anda meyakini seorang anak telah memberikan data pribadi kepada kami, hubungi kami di alamat di bawah dan kami akan menghapusnya.',
    'priv.h.changes': 'Perubahan pada Kebijakan Ini',
    'priv.p.changes': 'Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan tercermin di halaman ini dengan tanggal revisi yang diperbarui.',
    'priv.h.contact': 'Kontak',
    'priv.p.contact': 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',

    // Terms of Service page
    'terms.title': 'Ketentuan Layanan',
    'terms.updated': 'Terakhir diperbarui: 1 Agustus 2026',
    'terms.p.intro': 'Ketentuan Layanan ("Ketentuan") ini mengatur penggunaan Anda atas Infliction Point, termasuk aplikasi Android, aplikasi pendamping Wear OS, dan aplikasi web pendamping ("Layanan"), yang disediakan oleh 2an.dev ("kami"). Dengan mengunduh, memasang, atau menggunakan Layanan, Anda menyetujui Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan Layanan.',
    'terms.h.eligibility': 'Kelayakan',
    'terms.p.eligibility': 'Layanan ini tidak ditujukan untuk anak di bawah 13 tahun, dan Anda harus memenuhi usia minimum yang berlaku di negara Anda untuk menggunakannya. Jika Anda membuat akun, Anda bertanggung jawab atas keakuratan informasi yang Anda berikan dan menjaga keamanan akun Anda.',
    'terms.h.license': 'Lisensi Penggunaan',
    'terms.p.license': 'Kami memberikan Anda lisensi pribadi, non-eksklusif, tidak dapat dipindahtangankan, dan dapat dicabut untuk menggunakan Layanan dalam mencatat skor dan menyelenggarakan pertandingan padel. Anda tidak boleh melakukan rekayasa balik (reverse-engineer), menjual kembali, atau menggunakan Layanan untuk tujuan yang melanggar hukum.',
    'terms.h.accounts': 'Akun & Turnamen',
    'terms.p.accounts': 'Masuk (sign in) bersifat opsional dan membuka fitur tambahan seperti profil dan turnamen. Jika Anda membuat atau menyelenggarakan turnamen, Anda bertanggung jawab atas keakuratan informasi yang Anda masukkan (daftar pemain, skor, jadwal) dan atas cara Anda menyelenggarakan acara tersebut. Peserta lain dapat melihat data turnamen yang Anda bagikan kepada mereka, seperti dijelaskan dalam <a href="privacy.html">Kebijakan Privasi</a> kami.',
    'terms.h.content': 'Konten Pengguna',
    'terms.p.content': 'Anda tetap memiliki hak atas konten yang Anda berikan (info profil, foto, nama pemain, data turnamen). Dengan mengirimkan konten, Anda memberikan kami lisensi terbatas untuk menyimpan dan menampilkannya kembali kepada Anda dan peserta lain sesuai kebutuhan pengoperasian Layanan (misalnya menampilkan nama dan skor Anda kepada pemain lain dalam turnamen). Anda bertanggung jawab memastikan Anda memiliki hak untuk mengunggah konten apa pun, termasuk foto.',
    'terms.h.conduct': 'Penggunaan yang Diperbolehkan',
    'terms.p.conduct': 'Jangan gunakan Layanan untuk mengunggah konten yang melanggar hukum, kasar, atau melanggar hak pihak lain, menyamar sebagai orang lain, mengganggu operasional Layanan, atau mencoba mengakses akun maupun data yang bukan milik Anda.',
    'terms.h.thirdparty': 'Layanan Pihak Ketiga',
    'terms.p.thirdparty': 'Layanan ini bergantung pada platform pihak ketiga - Google Play Services, Firebase, Google Cast, dan mesin Text-to-Speech Android - untuk menyediakan fitur tertentu. Penggunaan Anda atas platform tersebut juga tunduk pada ketentuan mereka sendiri. Kami tidak bertanggung jawab atas ketersediaan atau perilaku layanan pihak ketiga di luar kendali kami.',
    'terms.h.availability': 'Ketersediaan & Perubahan',
    'terms.p.availability': 'Layanan ini saat ini disediakan secara gratis. Kami dapat menambah, mengubah, atau menghapus fitur, atau menangguhkan maupun menghentikan Layanan (atau sebagian darinya, seperti sinkronisasi turnamen) kapan saja. Fitur lokal (pencatatan skor Quick Match, riwayat pertandingan, dan saran nama pemain yang tersimpan di perangkat Anda) dirancang untuk tetap berjalan tanpa koneksi ke server kami, namun kami tidak menjamin operasi seluruh bagian Layanan bebas gangguan atau kesalahan. Fitur online yang bergantung pada server kami (seperti akun, profil, dan turnamen) gratis untuk saat ini, namun kami dapat memberlakukan harga, langganan, atau batas penggunaan untuk sebagian atau seluruh fitur tersebut di kemudian hari; jika itu terjadi, kami akan memberikan pemberitahuan dan tidak ada fitur yang sudah ada yang akan mulai dikenakan biaya tanpa persetujuan Anda.',
    'terms.h.termination': 'Penghentian',
    'terms.p.termination': 'Anda dapat berhenti menggunakan Layanan dan menghapus akun Anda kapan saja dari Settings → Delete Account. Kami dapat menangguhkan atau menghentikan akses akun yang melanggar Ketentuan ini.',
    'terms.h.disclaimer': 'Penyangkalan Jaminan',
    'terms.p.disclaimer': 'Layanan disediakan "sebagaimana adanya" dan "sebagaimana tersedia," tanpa jaminan dalam bentuk apa pun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa pencatatan skor, hasil pertandingan, atau data yang disinkronkan akan selalu akurat atau tersedia - Infliction Point adalah alat bantu pencatatan skor, bukan catatan resmi pertandingan untuk kompetisi atau ajang resmi kecuali dinyatakan lain oleh penyelenggara turnamen.',
    'terms.h.liability': 'Batasan Tanggung Jawab',
    'terms.p.liability': 'Sepanjang diizinkan oleh hukum yang berlaku, 2an.dev tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Layanan oleh Anda, termasuk kehilangan data pertandingan, perselisihan atas hasil pertandingan, atau masalah pada perangkat keras yang terhubung (tombol Flic, shutter remote, layar LED, layar berpasangan, atau perangkat Wear OS).',
    'terms.h.changes': 'Perubahan pada Ketentuan Ini',
    'terms.p.changes': 'Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Penggunaan Layanan yang berkelanjutan setelah perubahan berarti Anda menyetujui Ketentuan yang diperbarui. Perubahan material akan tercermin di halaman ini dengan tanggal revisi yang diperbarui.',
    'terms.h.contact': 'Kontak',
    'terms.p.contact': 'Jika Anda memiliki pertanyaan tentang Ketentuan ini, hubungi kami di <a href="mailto:infliction-point@2an.dev">infliction-point@2an.dev</a>.',
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
