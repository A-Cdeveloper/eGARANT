const logo = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/egarant-email.png`;

export const emailHtml = (
  url: string,
  emailText: string,
  buttonText: string,
  mode: string
) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            font-family: Arial, sans-serif;
            background-color: #394559;
            margin: 0;
            padding: 20px;
            height: 100%;
          }
          .email-container {
            max-width: 600px;
            margin: 0px auto;
            background-color: #394559;
            padding: 20px;
           
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 220px;
          }
          .content {
            text-align: center;
            color: #fff;
          }
          .content a {
            display: inline-block;
            margin: 10px 0px;
            padding: 10px 20px;
            background-color: #DB5C45FF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .content a:hover {
            background-color: #f1492a;
            text-decoration: none!important;
          }
          .note {
            margin-top: 20px;
            color: #A1A4BEFF;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <a href="${
              process.env.NEXT_PUBLIC_FRONTEND_URL
            }"><img src="${logo}" alt="eGarant" /></a>
          </div>
          <div class="content">
            <p>${emailText}</p>
            <a href="${url}">${buttonText}</a>
            <p class="note">${
              mode === "verification"
                ? "Ako Vi niste otvorili ovaj nalog, možete da zanemarite ovu e-poruku."
                : "Ukoliko vi niste zatrazili promenu lozinke, možete da zanemarite ovu e-poruku."
            }</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
