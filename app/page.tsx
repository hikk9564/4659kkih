export default function About() {
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
      {/* ==================== 상단 ==================== */}

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

        {/* 상단 메뉴 */}
        <nav
          style={{
            marginTop: "25px",
            display: "flex",
            gap: "28px",
            fontSize: "14px",
          }}
        >
          <a
            href="/about"
            style={{
              color: "#F2C94C",
              textDecoration: "none",
            }}
          >
            소개
          </a>

          <a
            href="/"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            게시판
          </a>

          <a
            href="#자캐"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            자캐
          </a>

          <a
            href="#선후관"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            선후관
          </a>

          <a
            href="#커미션"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            커미션
          </a>

          <a
            href="#기록"
            style={{
              color: "#2878B5",
              textDecoration: "none",
            }}
          >
            기록
          </a>

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

      {/* ==================== 소개 내용 ==================== */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "70px auto 0",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "400",
            marginBottom: "30px",
          }}
        >
          ABOUT
        </h2>

        {/* 개인 소개 */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: 0,
            }}
          >
            PROFILE
          </h3>

          <p
            style={{
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            {/* ✏️ 여기에 개인 소개를 작성하세요 */}
            안녕하세요! 힉힉이입니다.
            <br />
            이곳은 그림과 자캐, 여러 가지 기록을 모아두는 개인 홈페이지입니다.
          </p>
        </div>

        {/* SNS */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
            marginBottom: "25px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: 0,
            }}
          >
            SNS
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* ✏️ href="" 안에 SNS 주소를 입력하세요 */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2878B5",
                textDecoration: "none",
              }}
            >
              Twitter →
            </a>

            {/* ✏️ 필요 없는 SNS는 이 부분을 삭제하세요 */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2878B5",
                textDecoration: "none",
              }}
            >
              Instagram →
            </a>
          </div>
        </div>

        {/* 성향표 */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #B9DFF5",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: 0,
            }}
          >
            성향표
          </h3>

          <p
            style={{
              lineHeight: "1.8",
              fontSize: "15px",
            }}
          >
            {/* ✏️ 여기에 성향표 내용을 작성하세요 */}
            그림 이야기와 자캐 이야기를 좋아합니다.
            <br />
            편하게 교류해주세요!
          </p>
        </div>
      </section>
    </main>
  );
}
