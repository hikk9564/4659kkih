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
          borderBottom: "1px solid #B9DFF5",
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
          힉힉이집
        </p>

        <nav
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "28px",
            fontSize: "14px",
          }}
        >
          {/* 소개 - 클릭하면 소개 페이지로 이동 */}
          <a
            href="/about"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            소개
          </a>

          {/* 게시판 */}
          <a
            href="/"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            게시판
          </a>

          {/* 자캐 */}
          <a
            href="#자캐"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            자캐
          </a>

          {/* 선후관 */}
          <a
            href="#선후관"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            선후관
          </a>

          {/* 커미션 */}
          <a
            href="#커미션"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            커미션
          </a>

          {/* 기록 */}
          <a
            href="#기록"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            기록
          </a>

          {/* 방명록 */}
          <a
            href="#방명록"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            방명록
          </a>
        </nav>
      </header>

      {/* 헤더 이미지 영역 */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "70px auto 0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "280px",
            background: "#FFFFFF",
            border: "1px solid #B9DFF5",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5BB9E8",
            fontSize: "14px",
            overflow: "hidden",
          }}
        >
          {/* ✏️ 나중에 여기에 헤더 이미지를 넣을 예정 */}
          HEADER IMAGE
        </div>
      </section>

      {/* 소개 영역 */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "50px auto 0",
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
          {/* ✏️ 나중에 메인 화면에 들어갈 내용을 적으세요 */}
          테스트 1
          <br />
          테스트 2
        </p>
      </section>
    </main>
  );
}
