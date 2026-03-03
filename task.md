# BCT Aid HK — Task Tracker

> Figma: https://www.figma.com/design/9PKs8KrUpfxfg5kZKOJIOY/CU-Cancer?node-id=207-3442
> Last updated: 2026-03-03

---

## 1. Splash Screen

| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | SplashScreen | **TODO** | Figma `0.0.0.0_breast_splash`. App launch screen showing the logo centered on gradient background. Displays briefly while the app initializes and checks auth state before navigating to Login or Home. |

---

## 2. Login Flow

| # | Task | Status | Description |
|---|------|--------|-------------|
| 2 | LoginScreen — username/password form | Done | Figma `0.0.1.0`, `0.0.1.1`. Text inputs for username (with profile icon) and password (with lock icon), sign-in button. |
| 3 | LoginScreen — password visibility toggle & clear buttons | Done | Eye icon to toggle password visibility, X buttons to clear each field. |
| 4 | LoginScreen — animated entrance (stagger) | Done | Stagger animation on mount for banner and form fields. |
| 5 | LoginScreen — error handling & validation | Done | Figma `0.0.1.2`. Red error message display for invalid credentials. |
| 6 | ForgetPasswordSheet — modal with WhatsApp link | Done | Figma `0.0.1.3`. Bottom sheet with description text and WhatsApp contact button for password recovery. |

---

## 3. HomeScreen

| # | Task | Status | Description |
|---|------|--------|-------------|
| 7 | HomeScreen — Banner with logo & title | Done | Figma `0.1.0.0`. Shared Banner component with dancer image, ribbon, calligraphy title "乳房呵護 美麗綻放", and subtitle badges. |
| 8 | HomeScreen — MenuCard: 實用資訊 → InfoListScreen | Done | Card with ArticleIcon, navigates to InfoListScreen with slide animation. |
| 9 | HomeScreen — MenuCard: 價值觀探索練習 → ExerciseScreen | **TODO** | Card with QuestIcon, should navigate to ExerciseIntroScreen. Currently no navigation target exists. Wire up after Exercise screens are built. |
| 10 | HomeScreen — ActionPill: 帳戶 → AccountSheet | Done | Pill button opening AccountSheet modal. |
| 11 | HomeScreen — ActionPill: 聯絡 → ContactSheet | **TODO** | Figma `0.1.0.7`. Currently opens WhatsApp directly. Figma shows a bottom sheet modal titled "聯絡我們" with description text and a "WhatsApp 聯絡我們" button. Build a ContactSheet component similar to ForgetPasswordSheet. |
| 12 | HomeScreen — ActionPill: 關於 → AboutScreen | **TODO** | Figma `0.1.0.8`. Should navigate to or open a modal with "關於我們" content. See task #38. |
| 13 | HomeScreen — Footer: 個人資料聲明 (Privacy) | **TODO** | Footer link that navigates to PrivacyScreen. Text link in footer area below university logos. |
| 14 | HomeScreen — Footer: 免責聲明 (Disclaimer) | **TODO** | Footer link that navigates to DisclaimerScreen. Text link next to Privacy link. |
| 15 | HomeScreen — University logos & copyright | Done | Three SVG logos (CUHK, CU Medicine, school) with copyright text. |
| 16 | HomeScreen — animated entrance (stagger) | Done | Stagger animation on mount. |
| 17 | HomeScreen — Set Treatment Date Prompt | **TODO** | Figma `0.1.0.1`. First-time user prompt modal "請輸入手術日期" with description, "支援" (WhatsApp) button, "輸入日期" button, plus a sticky bottom bar showing "輸入手術日期 >" and "稍後設定". Appears when user has no treatment date set. |

---

## 4. AccountSheet

| # | Task | Status | Description |
|---|------|--------|-------------|
| 18 | AccountSheet — user profile display | Done | Shows username and profile icon. |
| 19 | AccountSheet — treatment date picker | Done | Figma `0.1.0.3`, `0.1.0.5`. DateTimePicker for setting/updating surgery date. |
| 20 | AccountSheet — date lock state | **TODO** | Figma `0.1.0.6`. After a certain period, the treatment date becomes locked and cannot be changed. Show a locked state with explanation text. |
| 21 | AccountSheet — logout confirmation | **TODO** | Figma `0.1.0.6_breast_home_logout`. Currently logs out immediately. Figma shows a confirmation dialog before logout. Add an "確定登出?" confirmation step. |
| 22 | AccountSheet — logout | Done | Sign out functionality via AuthContext. |

---

## 5. InfoListScreen (實用資訊)

| # | Task | Status | Description |
|---|------|--------|-------------|
| 23 | InfoListScreen — 4 expandable sections with animation | Done | Figma `0.2.0.0`. Collapse/expand height animation for each section. |
| 24 | InfoListScreen — article list items with icons | Done | PassageIcon + article title + arrow for each item. |
| 25 | InfoListScreen — header with back & WhatsApp buttons | Done | Back arrow left, WhatsApp icon right. |
| 26 | InfoListScreen — section locking by treatment date | **TODO** | Figma `0.2.0.1b`. Sections 2-4 should show a lock icon and be non-expandable if the user's treatment date hasn't reached the required milestone (2 weeks, 3 months, 6 months post-surgery). Tapping a locked section shows "文章尚未開放" modal. |
| 27 | InfoListScreen — "已讀" read status per article | **TODO** | Figma `0.2.0.1`. Articles that have been read show a purple "已讀 ✓" badge on the right side. Track read status per article (local storage or API). |

---

## 6. Article Detail Screen (Generic Component)

> A reusable ArticleDetailScreen that renders rich content from API data. Figma shows multiple article layouts with shared UI patterns.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 28 | ArticleDetailScreen — base layout & navigation | **TODO** | Figma `0.2.1.0`. Screen with header (back arrow, title, WhatsApp icon, home icon), scrollable body on gradient background. Register as a stack screen in AppNavigator. Navigate from InfoListScreen article items. |
| 29 | ArticleDetailScreen — rich text rendering | **TODO** | Figma `0.2.1.0`, `0.2.1.2`. Render article content with: section headers (purple with left border), body paragraphs, bold text, bullet lists, numbered lists, and inline links. Content comes from API. Consider using a markdown or structured JSON renderer. |
| 30 | ArticleDetailScreen — inline images | **TODO** | Figma `0.2.1.1`, `0.2.1.2`. Display images within article body. Images appear in cards with rounded corners. Tapping an image opens a fullscreen viewer (see task #32). |
| 31 | ArticleDetailScreen — image carousel | **TODO** | Figma `0.2.1.4`, `0.2.1.5`. Horizontal swipeable carousel for multiple images within an article section. Shows image with "放大顯示" (zoom) button. Indicators/dots for carousel position. |
| 32 | ArticleDetailScreen — fullscreen image viewer | **TODO** | Figma `0.2.1.6`, `0.2.1.6b`. Modal overlay showing image at full screen with pinch-to-zoom. Close button (X) to dismiss. Triggered by tapping images or "放大顯示". |
| 33 | ArticleDetailScreen — embedded YouTube videos | **TODO** | Figma `0.2.1.4`. Section labeled "影片" with video title, thumbnail with play button overlay. Tapping opens YouTube video (via WebView or deep link). |
| 34 | ArticleDetailScreen — collapsible sub-sections | **TODO** | Figma `0.2.1.3`. Some articles have expandable/collapsible sub-sections (e.g., lists of side effects). Purple header with +/- toggle, animated expand. |
| 35 | ArticleDetailScreen — reference links footer | **TODO** | Figma `0.2.1.3`. "參考資料" section at bottom with numbered reference links. Links open in external browser. |

---

## 7. Article Content (13 articles)

> Each article's content is fetched from the API. The ArticleDetailScreen (task #28-35) renders them. These tasks track content availability & integration.

**Section 1 — 治療前的決擇 (Pre-Surgery)**

| # | Task | Status | Description |
|---|------|--------|-------------|
| 36 | Article: 乳癌的資訊 | **TODO** | Integrate with API endpoint. Rich content with text, diagrams (flowchart image), and treatment overview. |
| 37 | Article: 常見的乳腺癌治療方法 | **TODO** | Integrate with API. Content about common breast cancer treatments. |
| 38 | Article: 手術及常見副作用的管理 | **TODO** | Integrate with API. Content about surgery and side-effect management with collapsible sections, images, numbered lists. |

**Section 2 — 迎接未來治療挑戰 (一) (Post-Surgery Week 2)**

| # | Task | Status | Description |
|---|------|--------|-------------|
| 39 | Article: 藥物治療及常見副作用的管理 | **TODO** | Integrate with API. Medication and side-effect management content. |
| 40 | Article: 放射治療和常見副作用的處理 | **TODO** | Integrate with API. Radiation therapy content. |
| 41 | Article: 飲食、體重控制和運動 | **TODO** | Integrate with API. Diet, weight, and exercise content with YouTube video embeds and image carousels. |

**Section 3 — 迎接未來治療挑戰 (二) (Post-Surgery 3 Months)**

| # | Task | Status | Description |
|---|------|--------|-------------|
| 42 | Article: 荷爾蒙治療及常見副作用的管理 | **TODO** | Integrate with API. Hormone therapy content. |
| 43 | Article: 性健康與身體形象 | **TODO** | Integrate with API. Sexual health and body image content. |
| 44 | Article: 睡眠和休息 | **TODO** | Integrate with API. Sleep and rest content. |
| 45 | Article: 精神健康 | **TODO** | Integrate with API. Mental health content. |

**Section 4 — 治療後的決擇 (Post-Surgery 6 Months)**

| # | Task | Status | Description |
|---|------|--------|-------------|
| 46 | Article: 減輕復發風險 | **TODO** | Integrate with API. Reducing recurrence risk content. |
| 47 | Article: 癌症治療後的健康飲食和運動 | **TODO** | Integrate with API. Post-treatment diet and exercise. |
| 48 | Article: 癌症治療以外的支援 | **TODO** | Integrate with API. Support beyond cancer treatment. |

---

## 8. Exercise / Questionnaire (價值觀探索練習)

> A multi-step questionnaire flow where users rate importance of surgery factors (0-100 slider). Shows comparison data (pie charts/icons for each factor) and produces a radar-chart result recommending a surgery type.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 49 | ExerciseIntroScreen — landing page | **TODO** | Figma `0.3.0.0`. Screen with header (back arrow, title "價值觀探索練習", WhatsApp icon), hero card with icon + description text, "開始探索練習" button, and collapsible "簡介" info section explaining the exercise purpose. |
| 50 | ExerciseQuestionScreen — question UI with slider | **TODO** | Figma `0.3.0.1` to `0.3.0.6b`. Each question shows: progress dots at top, question number + title, two side-by-side comparison cards ("可能的結果A" vs "可能的結果B") with pie charts or icons, a prompt asking the user to rate importance (0-100), a slider with value label, and "下一題" button. 6-7 questions total. |
| 51 | ExerciseQuestionScreen — pie chart / icon comparison cards | **TODO** | Figma `0.3.0.1`, `0.3.0.2`. Each question has two cards comparing surgical outcomes. Some show pie charts (e.g., 93% vs 95% survival rate), others show icons (e.g., money bags for cost). Build reusable comparison card component. |
| 52 | ExerciseQuestionScreen — quit confirmation dialog | **TODO** | Figma `0.3.0.4b`. When user presses back/close during the exercise, show "確定離開?" dialog warning that progress won't be saved, with "確定離開" red button. |
| 53 | ExerciseLoadingScreen — calculation loading | **TODO** | Figma `0.3.0.7`. Loading/spinner screen shown while the result is being calculated after submitting all answers. |
| 54 | ExerciseErrorScreen — API error state | **TODO** | Figma `0.3.0.7b`. Error screen if result calculation fails. Show error message with retry option. |
| 55 | ExerciseResultScreen — radar chart result | **TODO** | Figma `0.3.0.8`. Shows "價值觀探索練習分析結果" with: recommended surgery type in a highlighted card (e.g., "全乳房切除加乳房重建手術"), a radar/triangle chart showing match percentages for 3 surgery options, disclaimer text, "返回主頁" button, "重新開始" and "查看我的選擇" secondary buttons. |
| 56 | ExerciseResultScreen — review answers | **TODO** | Figma `0.3.0.7c`, `0.3.0.7d`. "查看我的選擇" opens a scrollable review of all answered questions with the user's slider values displayed. Allow scrolling through all answers. |
| 57 | ExerciseScreen — re-enter flow | **TODO** | Figma `0.3.0.9`. When user has already completed the exercise and returns, show previous result with option to retake. Two variants shown in Figma. |

---

## 9. About Screen (關於我們)

| # | Task | Status | Description |
|---|------|--------|-------------|
| 58 | AboutScreen — modal or page | **TODO** | Figma `0.1.0.8`. Scrollable page/modal with close button (X), titled "關於我們" with purple left-border accent. Two sections: "關於本計劃" (about the project — describes the BCT Aid HK tool, its 4-session structure, and purpose) and "關於本學院" (about the Nethersole School of Nursing — history and research). Long text content, likely from API or hardcoded. |

---

## 10. Legal Pages

| # | Task | Status | Description |
|---|------|--------|-------------|
| 59 | PrivacyScreen — 個人資料聲明 | **TODO** | Figma `0.1.0.9`. Scrollable page/modal with close button, titled "個人資料聲明". Contains sections: "收集個人資料聲明" and "個人資料政策" with bullet points, policy details, and contact email (bctaid@cuhk.edu.hk). Content likely hardcoded or from API. |
| 60 | DisclaimerScreen — 免責聲明 | **TODO** | Figma `0.1.0.10`. Scrollable page/modal with close button, titled "免責聲明". Contains disclaimer text about the app being for reference only, intellectual property notice, and contact email. |

---

## 11. Notifications / Prompts

| # | Task | Status | Description |
|---|------|--------|-------------|
| 61 | Notification — section unlock prompt | **TODO** | Figma `0.4.0.0`. Modal on HomeScreen showing "溫馨提示" with message like "第二節閱讀資料現已開放，歡迎閱覽。" and "前往" button. Triggered when a new info section becomes available based on treatment date milestones. |
| 62 | Notification — treatment date reminder | **TODO** | Figma `0.4.1.0`. Modal prompting user to set treatment date "請輸入手術日期" with "支援" (WhatsApp) and "輸入日期" buttons. Shows on HomeScreen when treatment date is not set. |
| 63 | Notification — push notification integration | **TODO** | Figma `0.4.1.1`. System-level push notifications to remind users when new sections unlock. Requires push notification setup (APNs/FCM). |

---

## 12. ContactSheet

| # | Task | Status | Description |
|---|------|--------|-------------|
| 64 | ContactSheet — bottom sheet modal | **TODO** | Figma `0.1.0.7`. Bottom sheet titled "聯絡我們" with description "若有任何查詢或心疑問，歡迎透過 WhatsApp 聯絡我們。我們很樂意為你服務！" and a full-width "WhatsApp 聯絡我們" green button. Similar structure to ForgetPasswordSheet. Replace the current direct WhatsApp link in HomeScreen with this sheet. |

---

## Summary

| Category | Done | TODO | Total |
|----------|------|------|-------|
| Splash Screen | 0 | 1 | 1 |
| Login Flow | 5 | 0 | 5 |
| HomeScreen | 5 | 5 | 10 |
| AccountSheet | 3 | 2 | 5 |
| InfoListScreen | 3 | 2 | 5 |
| Article Detail (component) | 0 | 8 | 8 |
| Article Content (13 articles) | 0 | 13 | 13 |
| Exercise / Questionnaire | 0 | 9 | 9 |
| About Screen | 0 | 1 | 1 |
| Legal Pages | 0 | 2 | 2 |
| Notifications / Prompts | 0 | 3 | 3 |
| ContactSheet | 0 | 1 | 1 |
| **Total** | **16** | **47** | **63** |
