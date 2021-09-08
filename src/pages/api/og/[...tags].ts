import type { NextApiRequest, NextApiResponse } from 'next';
import * as playwright from 'playwright-aws-lambda';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import OpenGraph from '@components/common/OpenGraph/OpenGraph';

const isDev = process.env.NODE_ENV !== 'production';
const isPreview = typeof process.env.BLOG_PREVIEW !== 'undefined';

async function getLaunchOptions() {
  if (isDev || isPreview) {
    return {
      args: [],
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
    };
  } else {
    return {};
  }
}

function getHtml({ title, body, color, tags }: Content): string {
  const element = React.createElement(OpenGraph, { title, body, color, tags });
  const markup = ReactDOMServer.renderToStaticMarkup(element);

  return `<!doctype html>${markup}`;
}
export interface Content {
  title: string;
  body: string;
  color: string;
  tags: string | string[];
}

function getContent(req: NextApiRequest): Content {
  const title = req.query.title as string;
  const body = req.query.body as string;
  const color = req.query.color as string;

  const { tags } = req.query;
  return { title, body, color, tags };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const content = getContent(req);
    // console.log(content);

    const html = getHtml(content);
    const viewport = { width: 1200, height: 630 };
    const launchOptions = await getLaunchOptions();
    const browser = await playwright.launchChromium(launchOptions);
    const page = await browser.newPage({ viewport });

    await page.setContent(html, { waitUntil: 'networkidle' });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();

    res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
    res.setHeader('Content-Type', 'image/png');

    res.end(buffer);
  } catch (error) {
    console.error('[Error]: ', error);
    res.status(404).json({ message: 'Cannot render og-image' });
  }
};
