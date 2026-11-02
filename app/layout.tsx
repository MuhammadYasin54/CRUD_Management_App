
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
     
    >
      <body 
        cz-shortcut-listen="true"
      >{children}</body>
    </html>
  );
}
