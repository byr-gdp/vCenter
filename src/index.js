class vCenter {
  constructor(dom) {
    this.dom = dom;
    this.bind();
  }

  bind() {
    this.dom.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    const isSupportScrollIntoView = !!this.dom.scrollIntoView;
    // const isSupportScrollIntoView = false;

    if (isSupportScrollIntoView) {
      this.dom.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      const rect = this.dom.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      const middleY = absoluteTop - (window.innerHeight / 2) + rect.height / 2;
      this.emulateScrollTo(middleY);
    }
  }

  /**
   * window.scrollTo 垂直方向移动距离
   * @param {number} to 结束位置
   */
  emulateScrollTo(to) {
    const steps = 10;
    const stepDistance = Math.abs(to - window.pageYOffset) / steps;
    const isPlus = to - window.pageYOffset >= 0 ? true : false;
    let y = window.pageYOffset;
    const timer = window.requestAnimationFrame(function fn() {
      isPlus ? ( y+= stepDistance ) : (y -= stepDistance)

      if ((isPlus && y >= to) || (!isPlus && y <= to)) {
        // nothign happended
      } else {
        window.scrollTo(0, y);
        window.requestAnimationFrame(fn);
      }
    });
  }
}

export default vCenter;