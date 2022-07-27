/*
 * @desc 貝茲曲線, 最多可算到3階
 */
class Bezier {
  /**
   * @desc獲取曲線上的每個點, 可以設置點個數
   * @param {number} num 點個數
   * @param {h} h 矩形高度
   * @param {Array} p1 點座標
   * @param {Array} p2 點座標
   * @param {Array} p3 點座標
   * @param {Array} p4 點座標
   * 如果参数是 num, p1, p2 為一階貝茲曲線
   * 如果参数是 num, p1, c1, p2 為二階貝茲曲線
   * 如果参数是 num, p1, c1, c2, p2 為三階貝茲曲線
   */
  getOneBezierPoints = (num = 100, h: number, p1: number[], p2: number[]) => {
    const func = this.oneBezier;
    const points: any[] = [];
    for (let i = 0; i < num; i++) {
      points.push(func!(i / num, p1, p2));
    }
    let getPointPercent = "";
    points.forEach((d: any, index: number) => {
      d = d.map((e: any) => parseInt(e, 10));
      getPointPercent += `${index}% ${((d[1] / h) * 100).toFixed(2)}% ,`;
    });
    return getPointPercent;
  };

  getTwoBezierPoints = (
    num = 100,
    h: number,
    p1: number[],
    p2: number[],
    p3: number[]
  ) => {
    const func = this.twoBezier;
    const points: any[] = [];
    for (let i = 0; i < num; i++) {
      points.push(func!(i / num, p1, p2, p3));
    }
    if (p3) {
      points.push([...p3]);
    }
    let getPointPercent = "";
    points.forEach((d: any, index: number) => {
      d = d.map((e: any) => parseInt(e, 10));
      getPointPercent += `${index}% ${((d[1] / h) * 100).toFixed(2)}% ,`;
    });
    return getPointPercent;
  };

  getThirBezierPoints = (
    num = 100,
    h: number,
    p1: number[],
    p2: number[],
    p3: number[],
    p4: number[]
  ) => {
    const func = this.threeBezier;
    const points: any[] = [];
    for (let i = 0; i < num; i++) {
      points.push(func!(i / num, p1, p2, p3, p4));
    }
    if (p4) {
      points.push([...p4]);
    } else if (p3) {
      points.push([...p3]);
    }
    let getPointPercent = "";
    points.forEach((d: any, index: number) => {
      d = d.map((e: any) => parseInt(e, 10));
      getPointPercent += `${index}% ${((d[1] / h) * 100).toFixed(2)}% ,`;
    });
    return getPointPercent;
  };

  /**
   * @desc 一階貝茲曲線
   * @param {number} t 當前百分比
   * @param {Array} p1 起點座標
   * @param {Array} p2 終點座標
   */
  oneBezier = (t: number, p1: number[], p2: number[]) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    let x = x1 + (x2 - x1) * t;
    let y = y1 + (y2 - y1) * t;
    return [x, y];
  };

  /**
   * @desc 二階貝茲曲線
   * @param {number} t 當前百分比
   * @param {Array} p1 起點座標
   * @param {Array} p2 終點座標
   * @param {Array} cp 控制點
   */
  twoBezier = (t: number, p1: number[], cp: number[], p2: number[]) => {
    const [x1, y1] = p1;
    const [cx, cy] = cp;
    const [x2, y2] = p2;
    let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return [x, y];
  };

  /**
   * @desc 三階貝茲曲線
   * @param {number} t 當前百分比
   * @param {Array} p1 起點座標
   * @param {Array} p2 終點座標
   * @param {Array} cp1 控制點1
   * @param {Array} cp2 控制點2
   */
  threeBezier = (
    t: number,
    p1: number[],
    cp1: number[],
    cp2: number[],
    p2: number[]
  ) => {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [cx1, cy1] = cp1;
    const [cx2, cy2] = cp2;
    let x =
      x1 * (1 - t) * (1 - t) * (1 - t) +
      3 * cx1 * t * (1 - t) * (1 - t) +
      3 * cx2 * t * t * (1 - t) +
      x2 * t * t * t;
    let y =
      y1 * (1 - t) * (1 - t) * (1 - t) +
      3 * cy1 * t * (1 - t) * (1 - t) +
      3 * cy2 * t * t * (1 - t) +
      y2 * t * t * t;
    return [x, y];
  };
}

export const ChengBezier = new Bezier();
