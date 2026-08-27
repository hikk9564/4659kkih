export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
      background: "#EAF6FF",
      color: "#234A68",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderBottom: "1px solid #3f3933",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          O.HOME
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.7,
          }}
        >
          Welcome to my homepage.
        </p>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "80px auto 0",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          Hello :)
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            maxWidth: "600px",
          }}
        >
          This is my little space on the internet.
          <br />
          I&apos;ll put my drawings, characters, and other things here.
        </p>
      </section>
    </main>
  );
}
