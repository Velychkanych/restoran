import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import Script from "next/script";
import Interactions from "@/components/effects/Interactions";
import AmbientBackground from "@/components/effects/AmbientBackground";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lypetska-polyana.site"),
  title: "Продаж комерційної будівлі 560 м² · Липецька Поляна · Закарпаття",
  description:
    "Продаж двоповерхової цегляної будівлі 560 м² у горах Закарпаття. Ділянка 0.5 га, власний ставок, лікувальна вода. Під ресторан, готель або wellness-комплекс. Ціна договірна.",
  keywords:
    "продаж комерційна нерухомість Закарпаття, будівля під ресторан Хустський район, готель Карпати продаж, wellness комплекс Закарпаття, Липецька Поляна нерухомість",
  robots: "index, follow",
  authors: [{ name: "Юрій Величканич" }],
  alternates: {
    canonical: "https://lypetska-polyana.site/",
  },
  icons: {
    icon: { url: "/images/12.jpg", type: "image/jpeg" },
  },
  openGraph: {
    type: "website",
    url: "https://lypetska-polyana.site/",
    title: "Продаж 560 м² · Закарпаття · лікувальна вода · $100 000",
    description:
      "Цегляна комерційна будівля 560 м² на 0.5 га в горах Закарпаття. Власний ставок, лікувальна підземна вода. Ідеально під ресторан, SPA або готель.",
    siteName: "Липецька Поляна",
    locale: "uk_UA",
    images: [
      {
        url: "https://lypetska-polyana.site/images/photo-02.jpg",
        width: 1200,
        height: 630,
        alt: "Будівля 560 м² · Липецька Поляна · Закарпаття",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Продаж 560 м² · Закарпаття · $100 000",
    description:
      "Цегляна комерційна будівля 560 м² на 0.5 га в горах Закарпаття. Під ресторан, SPA або готель.",
    images: ["https://lypetska-polyana.site/images/photo-02.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "Продаж комерційної будівлі 560 м² · Липецька Поляна",
  description:
    "Двоповерхова цегляна будівля 560 м² на ділянці 0.5 га в горах Закарпаття. Власний ставок, лікувальна підземна вода. Під ресторан, готель або wellness-комплекс.",
  url: "https://lypetska-polyana.site/",
  image: "https://lypetska-polyana.site/images/photo-02.jpg",
  offers: {
    "@type": "Offer",
    price: "100000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Липецька Поляна",
    addressRegion: "Закарпатська область",
    addressCountry: "UA",
  },
  floorSize: {
    "@type": "QuantitativeValue",
    value: 560,
    unitCode: "MTK",
  },
  seller: {
    "@type": "Person",
    name: "Юрій Величканич",
    telephone: "+380680924002",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${unbounded.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Schema.org: структуровані дані для Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Facebook Pixel */}
        {/* ЗАМІНИТИ: YOUR_PIXEL_ID на реальний ID пікселя з Meta Business Manager */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <AmbientBackground />
        <Interactions />
        {children}
      </body>
    </html>
  );
}
