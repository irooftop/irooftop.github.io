// The docs in 20 languages, besides English: the lang and dir of each locale, its description, and the
// interface strings (nav, sidebar, outline, footer, search, copy button). Each `ui` array follows the order
// of KEYS; config.mts checks the lengths when it loads. The home page is translated too (docs/<dir>/index.md);
// the other pages are English for now, so the sidebar of every locale links to the English pages.

export const KEYS = [
  "guide", "features", "reference", "releases", "changelog",
  "gettingStarted", "offline", "exportChat", "desktop", "unsigned", "docker",
  "howItWorks", "shareLinks", "telegram", "media", "mcp",
  "configuration", "cli", "httpApi", "relayHub", "development",
  "outline", "lastUpdated", "editLink", "prev", "next", "backToTop", "menu", "appearance", "language", "skip",
  "footerMessage", "footerCopyright",
  "searchButton", "searchNoResults", "searchClear", "searchSelect", "searchNavigate", "searchClose",
  "copyTooltip", "copied",
] as const;

export interface Locale {
  dir: string; // the URL folder, also the key of the locale
  lang: string; // BCP 47, the lang attribute
  label: string; // its name in its own language, in the language menu
  rtl?: boolean;
  description: string;
  ui: string[];
}

export const en = {
  label: "English",
  lang: "en-US",
  description: "Continue a Telegram or WhatsApp chat with an LLM that writes in the style of a person you miss.",
  ui: [
    "Guide", "Features", "Reference", "Releases", "Changelog",
    "Getting started", "Offline & privacy", "Export a chat", "Desktop app", "Open an unsigned app", "Docker & servers",
    "How it works", "Share links", "Answer from Telegram", "Photos & voice", "MCP tools",
    "Configuration", "CLI", "HTTP API", "Relay hub", "Development",
    "On this page", "Last updated", "Edit this page on GitHub", "Previous page", "Next page", "Back to top", "Menu", "Appearance", "Change language", "Skip to content",
    "Released under the MIT License.", "Made for staying close to people who are far away.",
    "Search", "No results", "Clear", "to select", "to navigate", "to close",
    "Copy code", "Copied",
  ],
};

export const locales: Locale[] = [
  {
    dir: "es", lang: "es", label: "Español",
    description: "Continúa un chat de Telegram o WhatsApp con un LLM que escribe al estilo de una persona que echas de menos.",
    ui: ["Guía","Funciones","Referencia","Versiones","Novedades","Primeros pasos","Sin conexión y privacidad","Exportar un chat","App de escritorio","Abrir una app sin firmar","Docker y servidores","Cómo funciona","Enlaces para compartir","Responder desde Telegram","Fotos y voz","Herramientas MCP","Configuración","CLI","API HTTP","Hub de relé","Desarrollo","En esta página","Última actualización","Editar esta página en GitHub","Página anterior","Página siguiente","Volver arriba","Menú","Apariencia","Cambiar idioma","Ir al contenido","Publicado bajo la licencia MIT.","Hecho para estar cerca de las personas que están lejos.","Buscar","Sin resultados","Borrar","para elegir","para navegar","para cerrar","Copiar código","Copiado"],
  },
  {
    dir: "zh-hans", lang: "zh-Hans", label: "简体中文",
    description: "用一个 LLM 续写 Telegram 或 WhatsApp 聊天，它以你想念的那个人的风格说话。",
    ui: ["指南","功能","参考","版本","更新日志","快速开始","离线与隐私","导出聊天","桌面应用","打开未签名的应用","Docker 与服务器","工作原理","分享链接","从 Telegram 回复","照片与语音","MCP 工具","配置","命令行","HTTP API","中继枢纽","开发","本页内容","最后更新","在 GitHub 上编辑此页","上一页","下一页","回到顶部","菜单","外观","切换语言","跳到正文","基于 MIT 许可证发布。","为身处异地、想与亲人保持亲近而做。","搜索","没有结果","清除","选择","导航","关闭","复制代码","已复制"],
  },
  {
    dir: "hi", lang: "hi", label: "हिन्दी",
    description: "एक LLM के साथ Telegram या WhatsApp चैट जारी रखें, जो उस व्यक्ति के अंदाज़ में लिखता है जिसकी आपको याद आती है।",
    ui: ["गाइड","सुविधाएँ","संदर्भ","रिलीज़","बदलाव का लॉग","शुरू करें","ऑफ़लाइन और गोपनीयता","चैट एक्सपोर्ट करें","डेस्कटॉप ऐप","बिना साइन किया ऐप खोलें","Docker और सर्वर","यह कैसे काम करता है","शेयर लिंक","Telegram से जवाब दें","फ़ोटो और आवाज़","MCP टूल","कॉन्फ़िगरेशन","CLI","HTTP API","रिले हब","विकास","इस पेज पर","आखिरी बार अपडेट","GitHub पर यह पेज संपादित करें","पिछला पेज","अगला पेज","ऊपर जाएँ","मेन्यू","दिखावट","भाषा बदलें","सामग्री पर जाएँ","MIT लाइसेंस के तहत जारी।","उन लोगों के करीब रहने के लिए बनाया गया, जो दूर हैं।","खोजें","कोई परिणाम नहीं","साफ़ करें","चुनने के लिए","नेविगेट करने के लिए","बंद करने के लिए","कोड कॉपी करें","कॉपी हो गया"],
  },
  {
    dir: "ar", lang: "ar", label: "العربية", rtl: true,
    description: "تابع محادثة تيليغرام أو واتساب مع نموذج لغوي يكتب بأسلوب شخص تشتاق إليه.",
    ui: ["الدليل","الميزات","المرجع","الإصدارات","سجل التغييرات","البدء","دون اتصال والخصوصية","تصدير محادثة","تطبيق سطح المكتب","فتح تطبيق غير موقّع","Docker والخوادم","كيف يعمل","روابط المشاركة","الرد من Telegram","الصور والصوت","أدوات MCP","الإعدادات","واجهة الأوامر","HTTP API","مركز الترحيل","التطوير","في هذه الصفحة","آخر تحديث","تعديل هذه الصفحة على GitHub","الصفحة السابقة","الصفحة التالية","العودة إلى الأعلى","القائمة","المظهر","تغيير اللغة","تخطَّ إلى المحتوى","منشور بموجب ترخيص MIT.","صُنع ليبقيك قريباً من الأشخاص البعيدين.","بحث","لا توجد نتائج","مسح","للاختيار","للتنقل","للإغلاق","نسخ الكود","تم النسخ"],
  },
  {
    dir: "fr", lang: "fr", label: "Français",
    description: "Poursuivez une conversation Telegram ou WhatsApp avec un LLM qui écrit dans le style d'une personne qui vous manque.",
    ui: ["Guide","Fonctions","Référence","Versions","Nouveautés","Premiers pas","Hors ligne et confidentialité","Exporter une conversation","Application de bureau","Ouvrir une application non signée","Docker et serveurs","Fonctionnement","Liens de partage","Répondre depuis Telegram","Photos et voix","Outils MCP","Configuration","CLI","API HTTP","Relais","Développement","Sur cette page","Dernière mise à jour","Modifier cette page sur GitHub","Page précédente","Page suivante","Haut de page","Menu","Apparence","Changer de langue","Aller au contenu","Publié sous licence MIT.","Fait pour rester proche des personnes qui sont loin.","Rechercher","Aucun résultat","Effacer","pour choisir","pour naviguer","pour fermer","Copier le code","Copié"],
  },
  {
    dir: "bn", lang: "bn", label: "বাংলা",
    description: "একটি LLM দিয়ে Telegram বা WhatsApp চ্যাট চালিয়ে যান, যা সেই মানুষটির ধরনে লেখে যাকে আপনি মিস করেন।",
    ui: ["গাইড","বৈশিষ্ট্য","রেফারেন্স","রিলিজ","পরিবর্তনের তালিকা","শুরু করুন","অফলাইন ও গোপনীয়তা","চ্যাট এক্সপোর্ট","ডেস্কটপ অ্যাপ","সাইন-বিহীন অ্যাপ খোলা","Docker ও সার্ভার","এটি কীভাবে কাজ করে","শেয়ার লিংক","Telegram থেকে উত্তর","ছবি ও ভয়েস","MCP টুলস","কনফিগারেশন","CLI","HTTP API","রিলে হাব","ডেভেলপমেন্ট","এই পৃষ্ঠায়","সর্বশেষ আপডেট","GitHub-এ এই পৃষ্ঠা সম্পাদনা করুন","আগের পৃষ্ঠা","পরের পৃষ্ঠা","উপরে ফিরুন","মেনু","চেহারা","ভাষা পরিবর্তন","মূল বিষয়বস্তুতে যান","MIT লাইসেন্সে প্রকাশিত।","যারা দূরে আছে তাদের কাছাকাছি থাকার জন্য তৈরি।","অনুসন্ধান","কোনো ফলাফল নেই","মুছুন","নির্বাচনের জন্য","নেভিগেট করতে","বন্ধ করতে","কোড কপি করুন","কপি হয়েছে"],
  },
  {
    dir: "pt-br", lang: "pt-BR", label: "Português (Brasil)",
    description: "Continue uma conversa do Telegram ou do WhatsApp com um LLM que escreve no estilo de uma pessoa que você sente falta.",
    ui: ["Guia","Recursos","Referência","Versões","Novidades","Primeiros passos","Offline e privacidade","Exportar uma conversa","App para desktop","Abrir um app sem assinatura","Docker e servidores","Como funciona","Links de compartilhamento","Responder pelo Telegram","Fotos e voz","Ferramentas MCP","Configuração","CLI","API HTTP","Hub de relé","Desenvolvimento","Nesta página","Última atualização","Editar esta página no GitHub","Página anterior","Próxima página","Voltar ao topo","Menu","Aparência","Mudar idioma","Ir para o conteúdo","Publicado sob a licença MIT.","Feito para manter por perto quem está longe.","Pesquisar","Nenhum resultado","Limpar","para selecionar","para navegar","para fechar","Copiar código","Copiado"],
  },
  {
    dir: "ru", lang: "ru", label: "Русский",
    description: "Продолжайте чат из Telegram или WhatsApp с помощью LLM, которая пишет в манере человека, по которому вы скучаете.",
    ui: ["Руководство","Возможности","Справка","Версии","Список изменений","Начало работы","Офлайн и конфиденциальность","Экспорт чата","Приложение для компьютера","Открытие неподписанного приложения","Docker и серверы","Как это работает","Ссылки для общего доступа","Ответы из Telegram","Фото и голос","Инструменты MCP","Настройка","CLI","HTTP API","Релей-хаб","Разработка","На этой странице","Последнее обновление","Редактировать эту страницу на GitHub","Предыдущая страница","Следующая страница","Наверх","Меню","Оформление","Сменить язык","Перейти к содержимому","Распространяется по лицензии MIT.","Создано, чтобы быть рядом с теми, кто далеко.","Поиск","Ничего не найдено","Очистить","выбрать","перейти","закрыть","Копировать код","Скопировано"],
  },
  {
    dir: "ur", lang: "ur", label: "اردو", rtl: true,
    description: "ایک LLM کے ساتھ Telegram یا WhatsApp کی چیٹ جاری رکھیں، جو اُس شخص کے انداز میں لکھتا ہے جسے آپ یاد کرتے ہیں۔",
    ui: ["گائیڈ","خصوصیات","حوالہ","ریلیزز","تبدیلیوں کی فہرست","شروع کریں","آف لائن اور رازداری","چیٹ ایکسپورٹ کریں","ڈیسک ٹاپ ایپ","بغیر دستخط والی ایپ کھولیں","Docker اور سرورز","یہ کیسے کام کرتا ہے","شیئر لنکس","Telegram سے جواب دیں","تصاویر اور آواز","MCP ٹولز","کنفیگریشن","CLI","HTTP API","ریلے ہب","ڈیولپمنٹ","اس صفحے پر","آخری اپ ڈیٹ","GitHub پر یہ صفحہ ترمیم کریں","پچھلا صفحہ","اگلا صفحہ","اوپر جائیں","مینو","ظاہری شکل","زبان تبدیل کریں","مواد پر جائیں","MIT لائسنس کے تحت جاری۔","دور رہنے والوں کے قریب رہنے کے لیے بنایا گیا۔","تلاش","کوئی نتیجہ نہیں","صاف کریں","منتخب کرنے کے لیے","نیویگیٹ کرنے کے لیے","بند کرنے کے لیے","کوڈ کاپی کریں","کاپی ہو گیا"],
  },
  {
    dir: "id", lang: "id", label: "Bahasa Indonesia",
    description: "Lanjutkan chat Telegram atau WhatsApp dengan LLM yang menulis dengan gaya orang yang kamu rindukan.",
    ui: ["Panduan","Fitur","Referensi","Rilis","Catatan perubahan","Mulai","Offline & privasi","Ekspor chat","Aplikasi desktop","Membuka aplikasi yang belum ditandatangani","Docker & server","Cara kerjanya","Tautan berbagi","Balas dari Telegram","Foto & suara","Alat MCP","Konfigurasi","CLI","HTTP API","Relay hub","Pengembangan","Di halaman ini","Terakhir diperbarui","Edit halaman ini di GitHub","Halaman sebelumnya","Halaman berikutnya","Kembali ke atas","Menu","Tampilan","Ganti bahasa","Lewati ke konten","Dirilis di bawah Lisensi MIT.","Dibuat untuk tetap dekat dengan orang-orang yang jauh.","Cari","Tidak ada hasil","Hapus","untuk memilih","untuk menavigasi","untuk menutup","Salin kode","Tersalin"],
  },
  {
    dir: "de", lang: "de", label: "Deutsch",
    description: "Setze einen Telegram- oder WhatsApp-Chat mit einem LLM fort, das im Stil eines Menschen schreibt, der dir fehlt.",
    ui: ["Anleitung","Funktionen","Referenz","Versionen","Änderungen","Erste Schritte","Offline & Datenschutz","Chat exportieren","Desktop-App","Eine nicht signierte App öffnen","Docker & Server","So funktioniert es","Freigabelinks","Antworten aus Telegram","Fotos & Sprache","MCP-Werkzeuge","Konfiguration","CLI","HTTP-API","Relay-Hub","Entwicklung","Auf dieser Seite","Zuletzt aktualisiert","Diese Seite auf GitHub bearbeiten","Vorherige Seite","Nächste Seite","Nach oben","Menü","Darstellung","Sprache wechseln","Zum Inhalt springen","Veröffentlicht unter der MIT-Lizenz.","Gemacht, um denen nahe zu sein, die weit weg sind.","Suchen","Keine Ergebnisse","Leeren","zum Auswählen","zum Navigieren","zum Schließen","Code kopieren","Kopiert"],
  },
  {
    dir: "ja", lang: "ja", label: "日本語",
    description: "LLMで、会いたい人の話し方を真似たTelegramやWhatsAppのチャットを続けられます。",
    ui: ["ガイド","機能","リファレンス","リリース","変更履歴","はじめに","オフラインとプライバシー","チャットを書き出す","デスクトップアプリ","未署名のアプリを開く","Docker とサーバー","仕組み","共有リンク","Telegram から返信","写真と音声","MCP ツール","設定","CLI","HTTP API","リレーハブ","開発","このページの内容","最終更新","GitHub でこのページを編集","前のページ","次のページ","トップへ戻る","メニュー","外観","言語を変更","本文へ移動","MIT ライセンスで公開。","遠くにいる人と、近くにいるための道具。","検索","結果がありません","クリア","選択","移動","閉じる","コードをコピー","コピーしました"],
  },
  {
    dir: "tr", lang: "tr", label: "Türkçe",
    description: "Özlediğin birinin tarzında yazan bir LLM ile Telegram ya da WhatsApp sohbetini sürdür.",
    ui: ["Rehber","Özellikler","Başvuru","Sürümler","Değişiklikler","Başlarken","Çevrimdışı ve gizlilik","Sohbeti dışa aktar","Masaüstü uygulaması","İmzasız bir uygulamayı açma","Docker ve sunucular","Nasıl çalışır","Paylaşım bağlantıları","Telegram'dan yanıtla","Fotoğraf ve ses","MCP araçları","Yapılandırma","CLI","HTTP API","Röle merkezi","Geliştirme","Bu sayfada","Son güncelleme","Bu sayfayı GitHub'da düzenle","Önceki sayfa","Sonraki sayfa","Başa dön","Menü","Görünüm","Dili değiştir","İçeriğe geç","MIT Lisansı ile yayımlanmıştır.","Uzakta olanlara yakın kalmak için yapıldı.","Ara","Sonuç yok","Temizle","seçmek için","gezinmek için","kapatmak için","Kodu kopyala","Kopyalandı"],
  },
  {
    dir: "ko", lang: "ko", label: "한국어",
    description: "그리운 사람의 말투로 이어 쓰는 LLM과 텔레그램이나 왓츠앱 대화를 계속하세요.",
    ui: ["가이드","기능","참조","릴리스","변경 기록","시작하기","오프라인과 개인정보","채팅 내보내기","데스크톱 앱","서명되지 않은 앱 열기","Docker와 서버","작동 방식","공유 링크","Telegram에서 답하기","사진과 음성","MCP 도구","설정","CLI","HTTP API","릴레이 허브","개발","이 페이지에서","마지막 업데이트","GitHub에서 이 페이지 편집","이전 페이지","다음 페이지","맨 위로","메뉴","모양","언어 변경","본문으로 건너뛰기","MIT 라이선스로 배포됩니다.","멀리 있는 사람들과 가까이 있기 위해 만들었습니다.","검색","결과 없음","지우기","선택","이동","닫기","코드 복사","복사됨"],
  },
  {
    dir: "vi", lang: "vi", label: "Tiếng Việt",
    description: "Tiếp tục đoạn chat Telegram hoặc WhatsApp với một LLM viết theo cách nói của người bạn nhớ.",
    ui: ["Hướng dẫn","Tính năng","Tham chiếu","Bản phát hành","Nhật ký thay đổi","Bắt đầu","Ngoại tuyến và quyền riêng tư","Xuất đoạn chat","Ứng dụng máy tính","Mở ứng dụng chưa ký","Docker và máy chủ","Cách hoạt động","Liên kết chia sẻ","Trả lời từ Telegram","Ảnh và giọng nói","Công cụ MCP","Cấu hình","CLI","HTTP API","Relay hub","Phát triển","Trên trang này","Cập nhật lần cuối","Sửa trang này trên GitHub","Trang trước","Trang sau","Lên đầu trang","Menu","Giao diện","Đổi ngôn ngữ","Chuyển đến nội dung","Phát hành theo giấy phép MIT.","Được tạo ra để giữ gần những người ở xa.","Tìm kiếm","Không có kết quả","Xóa","để chọn","để di chuyển","để đóng","Sao chép mã","Đã sao chép"],
  },
  {
    dir: "it", lang: "it", label: "Italiano",
    description: "Continua una chat di Telegram o WhatsApp con un LLM che scrive nello stile di una persona che ti manca.",
    ui: ["Guida","Funzioni","Riferimento","Versioni","Novità","Per iniziare","Offline e privacy","Esporta una chat","App desktop","Aprire un'app non firmata","Docker e server","Come funziona","Link di condivisione","Rispondere da Telegram","Foto e voce","Strumenti MCP","Configurazione","CLI","HTTP API","Relay hub","Sviluppo","In questa pagina","Ultimo aggiornamento","Modifica questa pagina su GitHub","Pagina precedente","Pagina successiva","Torna su","Menu","Aspetto","Cambia lingua","Vai al contenuto","Rilasciato con licenza MIT.","Fatto per stare vicini a chi è lontano.","Cerca","Nessun risultato","Cancella","per selezionare","per navigare","per chiudere","Copia codice","Copiato"],
  },
  {
    dir: "pl", lang: "pl", label: "Polski",
    description: "Kontynuuj czat z Telegrama lub WhatsAppa z LLM, który pisze w stylu osoby, za którą tęsknisz.",
    ui: ["Przewodnik","Funkcje","Dokumentacja","Wydania","Historia zmian","Pierwsze kroki","Offline i prywatność","Eksport czatu","Aplikacja na komputer","Otwieranie niepodpisanej aplikacji","Docker i serwery","Jak to działa","Linki udostępniania","Odpowiedzi z Telegrama","Zdjęcia i głos","Narzędzia MCP","Konfiguracja","CLI","HTTP API","Hub przekaźnika","Rozwój","Na tej stronie","Ostatnia aktualizacja","Edytuj tę stronę na GitHubie","Poprzednia strona","Następna strona","Do góry","Menu","Wygląd","Zmień język","Przejdź do treści","Wydane na licencji MIT.","Stworzone, by być blisko tych, którzy są daleko.","Szukaj","Brak wyników","Wyczyść","aby wybrać","aby nawigować","aby zamknąć","Kopiuj kod","Skopiowano"],
  },
  {
    dir: "uk", lang: "uk", label: "Українська",
    description: "Продовжуйте чат із Telegram або WhatsApp із LLM, що пише в манері людини, за якою ви сумуєте.",
    ui: ["Посібник","Можливості","Довідка","Релізи","Журнал змін","Початок роботи","Офлайн і конфіденційність","Експорт чату","Настільний застосунок","Відкриття непідписаного застосунку","Docker і сервери","Як це працює","Посилання для спільного доступу","Відповіді з Telegram","Фото та голос","Інструменти MCP","Налаштування","CLI","HTTP API","Релей-хаб","Розробка","На цій сторінці","Останнє оновлення","Редагувати цю сторінку на GitHub","Попередня сторінка","Наступна сторінка","Нагору","Меню","Вигляд","Змінити мову","Перейти до вмісту","Поширюється за ліцензією MIT.","Створено, щоб бути поруч із тими, хто далеко.","Пошук","Немає результатів","Очистити","щоб вибрати","щоб перейти","щоб закрити","Копіювати код","Скопійовано"],
  },
  {
    dir: "nl", lang: "nl", label: "Nederlands",
    description: "Zet een Telegram- of WhatsApp-chat voort met een LLM die schrijft in de stijl van iemand die je mist.",
    ui: ["Gids","Functies","Referentie","Releases","Wijzigingen","Aan de slag","Offline en privacy","Chat exporteren","Desktopapp","Een niet-ondertekende app openen","Docker en servers","Zo werkt het","Deellinks","Antwoorden vanuit Telegram","Foto's en stem","MCP-tools","Configuratie","CLI","HTTP API","Relay-hub","Ontwikkeling","Op deze pagina","Laatst bijgewerkt","Deze pagina bewerken op GitHub","Vorige pagina","Volgende pagina","Terug naar boven","Menu","Weergave","Taal wijzigen","Naar inhoud","Uitgebracht onder de MIT-licentie.","Gemaakt om dichtbij mensen te blijven die ver weg zijn.","Zoeken","Geen resultaten","Wissen","om te selecteren","om te navigeren","om te sluiten","Code kopiëren","Gekopieerd"],
  },
  {
    dir: "fa", lang: "fa", label: "فارسی", rtl: true,
    description: "گفتگوی تلگرام یا واتس‌اپ را با یک مدل زبانی ادامه دهید که به سبک کسی که دلتنگش هستید می‌نویسد.",
    ui: ["راهنما","امکانات","مرجع","انتشارها","تغییرات","شروع کنید","آفلاین و حریم خصوصی","خروجی گرفتن از گفتگو","برنامهٔ رومیزی","باز کردن برنامهٔ امضا‌نشده","Docker و سرورها","چگونه کار می‌کند","پیوندهای اشتراک‌گذاری","پاسخ از Telegram","عکس و صدا","ابزارهای MCP","پیکربندی","CLI","HTTP API","مرکز رله","توسعه","در این صفحه","آخرین به‌روزرسانی","ویرایش این صفحه در GitHub","صفحهٔ قبلی","صفحهٔ بعدی","بازگشت به بالا","منو","ظاهر","تغییر زبان","پرش به محتوا","منتشرشده با مجوز MIT.","ساخته‌شده برای نزدیک ماندن به کسانی که دورند.","جستجو","نتیجه‌ای نیست","پاک کردن","برای انتخاب","برای حرکت","برای بستن","کپی کد","کپی شد"],
  },
];
