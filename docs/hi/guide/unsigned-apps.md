# बिना साइन किया ऐप खोलना

डेस्कटॉप इंस्टॉलर अभी साइन या नोटराइज़ नहीं किए गए हैं, इसलिए पहली बार चलाने पर macOS और Windows में चेतावनी दिखती है। यह एक बार का चरण है: एक बार ऐप को अनुमति देने के बाद, वह सामान्य रूप से खुलता है, उन अपडेट के बाद भी जो उसी तरह इंस्टॉल हुए हों।

::: tip इससे बचना चाहते हैं?
[ऐप खुद बनाएँ](./desktop#build-it-yourself), या [सर्वर](./getting-started#install) चलाएँ और अपने ब्राउज़र में इस्तेमाल करें: `brew install irooftop/tap/rooftop`, `cargo install rooftop`, या [Docker](./docker)।
:::

## macOS

![macOS पर असत्यापित ऐप खोलना: "Not Opened" चेतावनी, Done, सिस्टम सेटिंग्स, गोपनीयता और सुरक्षा, फिर भी खोलें, पासवर्ड, और ऐप खुल जाता है](/how-to-open-an-unsigned-app-on-macos.svg)

macOS 15 Sequoia और उसके बाद:

1. **iRoof.top** खोलें। macOS कहेगा *"iRoof.top" नहीं खुल सका: Apple सत्यापित नहीं कर सका…*। **Done** पर क्लिक करें।
2. **Apple मेनू → सिस्टम सेटिंग्स… → गोपनीयता और सुरक्षा** खोलें।
3. **सुरक्षा** तक नीचे स्क्रॉल करें: *"iRoof.top" को आपके Mac की सुरक्षा के लिए ब्लॉक किया गया था*। **फिर भी खोलें** पर क्लिक करें।
4. **फिर भी खोलें** से पुष्टि करें, और अपना पासवर्ड डालें या Touch ID का उपयोग करें।

**फिर भी खोलें** बटन केवल तब दिखता है जब आपने ऐप खोलने की कोशिश की हो, लगभग एक घंटे तक। अगर यह न दिखे, तो ऐप दोबारा खोलें और गोपनीयता और सुरक्षा पर वापस जाएँ।

macOS 14 Sonoma और उससे पहले, Finder में ऐप पर राइट-क्लिक (या Control-क्लिक) करें, **Open** चुनें, फिर फिर से **Open** दबाएँ।

### टर्मिनल से

ब्राउज़र ने डाउनलोड पर जो क्वारंटीन फ़्लैग लगाया है, उसे हटाना भी काम करता है:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

यह हमेशा काम नहीं करता: नए macOS पर, `/Applications` में ऐप बदलने के लिए टर्मिनल को गोपनीयता और सुरक्षा में **App Management** (या **Full Disk Access**) चाहिए हो सकता है, और उसके बिना यह `Operation not permitted` के साथ विफल होता है। ऊपर के चरण हमेशा काम करते हैं।

::: details "iRoof.top क्षतिग्रस्त है और खोला नहीं जा सकता"
यह संदेश भी क्वारंटीन फ़्लैग को दर्शाता है, टूटे हुए डाउनलोड को नहीं। **Cancel** पर क्लिक करें (**Move to Trash** पर नहीं) और ऊपर का `xattr` कमांड चलाएँ, या सिस्टम सेटिंग्स के चरणों का पालन करें।
:::

## Windows

SmartScreen इंस्टॉलर के लिए **Windows ने आपके PC की सुरक्षा की** दिखाता है:

1. **More info** पर क्लिक करें।
2. **Run anyway** पर क्लिक करें।

अगर ब्राउज़र डाउनलोड रोकता है (*आमतौर पर डाउनलोड नहीं की जाने वाली फ़ाइल*), तो डाउनलोड सूची खोलें, **⋯ → Keep** चुनें, फिर **Show more → Keep anyway**। `.msi` के लिए आप राइट-क्लिक → **Properties** → **Unblock** पर टिक करें → **OK** भी कर सकते हैं, चलाने से पहले।

**Smart App Control** चालू होने वाले Windows 11 पर बिना साइन किए ऐप्स **Run anyway** बटन के बिना ब्लॉक होते हैं। इसके बजाय [सर्वर](./getting-started#install) इस्तेमाल करें, या **Windows Security → App & browser control → Smart App Control settings** में Smart App Control बंद करें।

## Linux

Linux बिना साइन किए ऐप्स को ब्लॉक नहीं करता, लेकिन AppImage को चलने की अनुमति चाहिए:

```sh
chmod +x iRoof.top_amd64.AppImage    # या: Properties → Permissions → Allow executing file as program
./iRoof.top_amd64.AppImage
```

अगर यह FUSE की शिकायत करता है (`dlopen(): error loading libfuse.so.2`), तो `libfuse2` इंस्टॉल करें (Ubuntu 24.04: `sudo apt install libfuse2t64`) या `--appimage-extract-and-run` के साथ चलाएँ।

पैकेज पैकेज मैनेजर से इंस्टॉल होते हैं, जो स्थानीय बिना साइन किए पैकेज स्वीकार करता है:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
