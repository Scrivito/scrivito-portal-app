# Scrivito Portal App - Widget Overview

This application contains **62 widgets** organized into the following categories:

---

## **Visual Widgets** (51)

### 📝 Content Display (6)

- [TextWidget](src/Widgets/TextWidget/TextWidgetClass.ts) - HTML text content with alignment
- [HeadlineWidget](src/Widgets/HeadlineWidget/HeadlineWidgetClass.ts) - Headlines (h1-h6) with customizable styles
- [ImageWidget](src/Widgets/ImageWidget/ImageWidgetClass.ts) - Image display with sizing, alignment, and optional link
- [IconWidget](src/Widgets/IconWidget/IconWidgetClass.ts) - Bootstrap icons with sizing and alignment
- [DividerWidget](src/Widgets/DividerWidget/DividerWidgetClass.ts) - Horizontal divider
- [SpaceWidget](src/Widgets/SpaceWidget/SpaceWidgetClass.ts) - Vertical spacing control

### 🔘 Interactive Elements (7)

- [ButtonWidget](src/Widgets/ButtonWidget/ButtonWidgetClass.ts) - Standard button with color/size variants
- [LinkWidget](src/Widgets/LinkWidget/LinkWidgetClass.ts) - Individual link (nested in LinkContainerWidget)
- [LogInButtonWidget](src/Widgets/LogInButtonWidget/LogInButtonWidgetClass.ts) - Authentication login button
- [CheckoutButtonWidget](src/Widgets/CheckoutButtonWidget/CheckoutButtonWidgetClass.ts) - E-commerce checkout button
- [DataDeleteButtonWidget](src/Widgets/DataDeleteButtonWidget/DataDeleteButtonWidgetClass.ts) - Delete button with confirmation
- [DataLoadMoreButtonWidget](src/Widgets/DataLoadMoreButtonWidget/DataLoadMoreButtonWidgetClass.ts) - Pagination load more button
- [DataFormSubmitButtonWidget](src/Widgets/DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass.ts) - Form submission button

### 🎬 Media (3)

- [VideoWidget](src/Widgets/VideoWidget/VideoWidgetObjClass.ts) - Self-hosted video player
- [VimeoVideoWidget](src/Widgets/VimeoVideoWidget/VimeoVideoWidgetClass.ts) - Vimeo video embed
- [YoutubeVideoWidget](src/Widgets/YoutubeVideoWidget/YoutubeVideoWidgetClass.ts) - YouTube video embed

### 🃏 Cards & Containers (4)

- [CardWidget](src/Widgets/CardWidget/CardWidgetClass.ts) - Card with header, body, footer, and background options
- [SectionWidget](src/Widgets/SectionWidget/SectionWidgetClass.ts) - Page section with background and padding controls
- [DownloadCardWidget](src/Widgets/DownloadCardWidget/DownloadCardWidgetClass.ts) - Downloadable resource card
- [DataPersonCardWidget](src/Widgets/DataPersonCardWidget/DataPersonCardWidgetClass.ts) - Person profile card with data binding

### 🧭 Navigation (7)

- [TopNavigationWidget](src/Widgets/TopNavigationWidget/TopNavigationWidgetClass.ts) - Main top navigation bar
- [VerticalNavigationWidget](src/Widgets/VerticalNavigationWidget/VerticalNavigationWidgetClass.ts) - Sidebar navigation
- [BreadcrumbWidget](src/Widgets/BreadcrumbWidget/BreadcrumbWidgetClass.ts) - Static breadcrumb navigation
- [DataBreadcrumbWidget](src/Widgets/DataBreadcrumbWidget/DataBreadcrumbWidgetClass.ts) - Dynamic breadcrumb with data
- [LanguageSwitchWidget](src/Widgets/LanguageSwitchWidget/LanguageSwitchWidgetClass.ts) - Language selector
- [HomepageFooterWidget](src/Widgets/HomepageFooterWidget/HomepageFooterWidgetClass.ts) - Site footer
- [LogoWidget](src/Widgets/LogoWidget/LogoWidgetClass.ts) - Brand logo display

### 📋 Lists & Sliders (4)

- [TickListWidget](src/Widgets/TickListWidget/TickListWidgetClass.ts) - Checkmark/bullet list container
- [TickListItemWidget](src/Widgets/TickListItemWidget/TickListItemWidgetClass.ts) - Individual list item
- [SliderWidget](src/Widgets/SliderWidget/SliderWidgetClass.ts) - Carousel/slider container
- [SlideWidget](src/Widgets/SlideWidget/SlideWidgetClass.ts) - Individual carousel slide

### 📐 Layout Widgets (8)

- [ColumnContainerWidget](src/Widgets/ColumnContainerWidget/ColumnContainerWidgetClass.ts) - Grid/flex column container
- [ColumnWidget](src/Widgets/ColumnWidget/ColumnWidgetClass.ts) - Individual column
- [GroupWidget](src/Widgets/GroupWidget/GroupWidgetClass.ts) - Generic widget grouping
- [LinkContainerWidget](src/Widgets/LinkContainerWidget/LinkContainerWidgetClass.ts) - Container for multiple links
- [IconContainerWidget](src/Widgets/IconContainerWidget/IconContainerWidgetClass.ts) - Container for multiple icons
- [BannerHeadlineContainerWidget](src/Widgets/BannerHeadlineContainerWidget/BannerHeadlineContainerWidgetClass.ts) - Container for banner headlines
- [BannerHeadlineWidget](src/Widgets/BannerHeadlineWidget/BannerHeadlineWidgetClass.ts) - Individual banner headline
- [PageTitleWidget](src/Widgets/PageTitleWidget/PageTitleWidgetClass.ts) - Page title section

### 📊 Data Display (7)

- [DataLabelWidget](src/Widgets/DataLabelWidget/DataLabelWidgetClass.ts) - Label/value pair from data (text, currency, datetime, link)
- [DataCountWidget](src/Widgets/DataCountWidget/DataCountWidgetClass.ts) - Numeric count display with pluralization
- [DataSearchWidget](src/Widgets/DataSearchWidget/DataSearchWidgetClass.ts) - Search input for data filtering
- [DataIconWidget](src/Widgets/DataIconWidget/DataIconWidgetClass.ts) - Conditional icon display based on data values
- [DataImageWidget](src/Widgets/DataImageWidget/DataImageWidgetClass.ts) - Image from data source
- [DataAttachmentsWidget](src/Widgets/DataAttachmentsWidget/DataAttachmentsWidgetClass.ts) - File attachments list
- [DataColumnListWidget](src/Widgets/DataColumnListWidget/DataColumnListWidgetClass.ts) - Data displayed in column layout

### 🏢 Specialized Display (2)

- [AddressWidget](src/Widgets/AddressWidget/AddressWidgetClass.ts) - Structured address display with contact info
- [ProductParameterWidget](src/Widgets/ProductParameterWidget/ProductParameterWidgetClass.ts) - Product variant parameters (e.g., color, size)

### 📝 Form Inputs (5)

- [DataFormInputFieldWidget](src/Widgets/DataFormInputFieldWidget/DataFormInputFieldWidgetClass.ts) - Text input (single-line, email, phone, multi-line)
- [DataFormBooleanWidget](src/Widgets/DataFormBooleanWidget/DataFormBooleanWidgetClass.ts) - Checkbox/switch toggle
- [DataFormNumberWidget](src/Widgets/DataFormNumberWidget/DataFormNumberWidgetClass.ts) - Number input with min/max/step
- [DataFormOptionsWidget](src/Widgets/DataFormOptionsWidget/DataFormOptionsWidgetClass.ts) - Select dropdown
- [DataFormUploadWidget](src/Widgets/DataFormUploadWidget/DataFormUploadWidgetClass.ts) - File upload field

---

## **Non-Visual Widgets** (11)

These widgets manage data flow, logic, and structure without directly rendering visible content:

### 🔄 Data Context Management (4)

- [DataWidget](src/Widgets/DataWidget/DataWidgetClass.ts) - **Primary data scope container** - establishes data context for child widgets
- [DataGroupWidget](src/Widgets/DataGroupWidget/DataGroupWidgetClass.ts) - **Groups data context** - creates nested data scope
- [DataEmptyWidget](src/Widgets/DataEmptyWidget/DataEmptyWidgetClass.ts) - **Conditional renderer** - displays content when data is empty
- [DataMessageWidget](src/Widgets/DataMessageWidget/DataMessageWidgetClass.ts) - **State-based display** - shows messages based on data state

### 📋 Form Logic (2)

- [DataFormContainerWidget](src/Widgets/DataFormContainerWidget/DataFormContainerWidgetClass.ts) - **Form handler** - manages form submission, validation, and redirects
- [DataFormHiddenFieldWidget](src/Widgets/DataFormHiddenFieldWidget/DataFormHiddenFieldWidgetClass.ts) - **Hidden field** - stores hidden form values

### ⚙️ Configuration Widgets (1)

- [DataIconConditionWidget](src/Widgets/DataIconConditionWidget/DataIconConditionWidgetClass.ts) - **Icon rule** - defines condition-based icon mapping (nested in DataIconWidget)

---

## Key Patterns

**Neoletter Form Widgets**: Integration with `scrivito-neoletter-form-widgets` library for extended form capabilities

**Data-Driven Architecture**: Heavy use of `datalocator` attribute for binding widgets to backend data sources

**Container Pattern**: Many widgets follow a container/item pattern (ColumnContainer/Column, Slider/Slide, TickList/TickListItem)

**Nested Widgets**: Several widgets restricted to specific parents via `onlyInside` (e.g., ColumnWidget only in ColumnContainerWidget)
