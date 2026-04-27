import PlatformLayout from '@/components/shared/layout/PlatformLayout';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlatformLayout>{children}</PlatformLayout>;
}
