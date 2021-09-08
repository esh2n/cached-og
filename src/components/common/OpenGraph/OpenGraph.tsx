import Logo from '@components/ui/Logo';
export interface Props {
  title: string;
  body: string;
  color: string;
  tags: string[];
}

const OpenGraph = ({ title, body, color = '#DCA584;', tags }: Props) => {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
    html,
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .wrapper {
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      font-family: 'M PLUS Rounded 1c';
      font-weight: bold;
      background-color: #ffffff;
    }
    .header {
      padding: 80px;
      display: flex;
      justify-content: space-between;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 750px;

    }
    .title {
      font-size: 50px;
      color: #2E3438;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .body {
      padding-top: 40px;

      font-size: 20px;
      color: #828688;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .author {
      font-size: 30px;
      font-weight: 700;
    }

    .footer {
      padding: 80px;
      display: flex;
      justify-content: space-between;
      color: #2E3438
    }
    .tags {
      display: flex;
    }
    .tags--item {
      font-size: 30px;
      margin-right: 48px;
    }
    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 32px;
    }
  `;

  return (
    <html>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <body>
        <div className="wrapper">
          <div className="header">
            <div className="content">
              <div className="title">{title}</div>
              <div className="body">{body}</div>
            </div>
            <Logo height={200} width={200} />
          </div>

          <div className="footer">
            <div className="tags">
              {tags.map((e, i) => (
                <div key={i} className="tags--item">
                  {e}
                </div>
              ))}
            </div>

            <div className="author">@esh2n</div>
          </div>

          <div className="bar" style={{ backgroundColor: color }}></div>
        </div>
      </body>
    </html>
  );
};

export default OpenGraph;
