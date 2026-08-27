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
          hikk9564
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
        <nav
  style={{
    marginTop: "25px",
    display: "flex",
    gap: "28px",
    fontSize: "14px",
  }}
>
  <a href="/" style={{ color: "#2878B5", textDecoration: "none" }}>
    HOME
  </a>

  <a href="#about" style={{ color: "#2878B5", textDecoration: "none" }}>
    ABOUT
  </a>

  <a href="#art" style={{ color: "#2878B5", textDecoration: "none" }}>
    ART
  </a>
</nav>
      </header>

    <section
  style={{
    maxWidth: "1100px",
    margin: "80px auto 0",
    background: "#FFFFFF",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(40, 120, 181, 0.08)",
  }}
>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "400",
          }}
        >
          테스트 0
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            maxWidth: "600px",
          }}
        >
         테스트 1
          <br />테스트 2
        </p>
      </section>
    </main>
  );
}
