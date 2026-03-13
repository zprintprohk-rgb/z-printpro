import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Z-PrintPro Hong Kong',
  description: 'View your shopping cart and proceed to checkout.',
  robots: { 
    index: false,
    follow: false,
    nocache: true,
  },
};

export const runtime = 'experimental-edge';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}