export default class Turntable {
  constructor(options) {
    this.canvas = options.canvas
    this.context = options.context
    this.awards = [
      {level: '特等奖', name: '我的亲笔签名', color: '#576c0a'},
      {level: '未中奖', name: '未中奖', color: '#ad4411'},
      {level: '一等奖', name: '玛莎拉蒂跑车', color: '#43ed04'},
      {level: '未中奖', name: '未中奖', color: '#d5ed1d'},
      {level: '二等奖', name: '辣条一包', color: '#32acc6'},
      {level: '未中奖', name: '未中奖', color: '#e06510'},
    ]
  }
  drawPanel() {
    const context = this.context
    context.save()
    context.beginPath()
    context.fillStyle = '#FD6961'
    context.arc(150, 150, 150, 0, Math.PI * 2, false)
    context.fill()
    context.restore()
  }
  drawPrizeBlock() {
    const context = this.context
    const awards = this.awards
    let startRadian = 0, RadianGap = Math.PI * 2 / 6, endRadian = startRadian + RadianGap
    for (let i = 0; i < awards.length; i++) {
      context.save()
      context.beginPath()
      context.fillStyle = awards[i].color
      context.moveTo(150, 150)
      context.arc(150, 150, 140, startRadian, endRadian, false)
      context.fill()
      context.restore()

      context.save();
			context.fillStyle = '#FFFFFF';
			context.font = "24px Arial";
			context.translate(
				150 + Math.cos(startRadian + RadianGap / 2) * 140,
				150 + Math.sin(startRadian + RadianGap / 2) * 140
			);
			context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
			// this.getLineTextArr(context, awards, 60).forEach((data, index) => {
				
      // })
      context.fillText(awards[i].name, -context.measureText(awards[i].name).width / 2, 40);
      context.restore();

      startRadian += RadianGap
      endRadian += RadianGap
    }
  }
  render() {
    this.drawPanel()
    this.drawPrizeBlock()
  }
}