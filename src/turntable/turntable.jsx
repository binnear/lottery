const noPrize = 'https://user-gold-cdn.xitu.io/2018/10/15/16677fb978eb1538?w=128&h=128&f=png&s=6861'

export default class Turntable {
  constructor(options) {
    this.canvas = options.canvas
    this.context = options.context
    this.awards = [
      { level: '特等奖', name: '我的亲笔签名', color: '#576c0a' },
      { level: '未中奖', name: '未中奖', color: '#ad4411' },
      { level: '一等奖', name: '玛莎拉蒂超级经典限量跑车', color: '#43ed04' },
      { level: '未中奖', name: '未中奖', color: '#d5ed1d' },
      { level: '二等奖', name: '辣条一包', color: '#32acc6' },
      { level: '未中奖', name: '未中奖', color: '#e06510' },
    ]
  }
  getLineTextList(context, text, maxLineWidth) {
    let wordList = text.split(''), tempLine = '', lineList = []
    for (let i = 0; i < wordList.length; i++) {
      if (context.measureText(tempLine).width >= maxLineWidth) {
        lineList.push(tempLine)
        maxLineWidth -= context.measureText(text[0]).width
        tempLine = ''
      }
      tempLine += wordList[i]
    }
    lineList.push(tempLine)
    return lineList
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
      context.fillStyle = '#FFF';
      context.font = "14px Arial";
      context.translate(
        150 + Math.cos(startRadian + RadianGap / 2) * 140,
        150 + Math.sin(startRadian + RadianGap / 2) * 140
      );
      context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
      this.getLineTextList(context, awards[i].name, 70).forEach((line, index) => {
        context.fillText(line, -context.measureText(line).width / 2, ++index * 25);
      })
      context.restore();

      startRadian += RadianGap
      endRadian += RadianGap
    }
  }
  drawButton() {
    const context = this.context
    context.save()
		context.beginPath()
		context.fillStyle = '#FF0000'
		context.arc(150, 150, 30, 0, Math.PI * 2, false)
		context.fill()
    context.restore()
    
    context.save();
    context.beginPath()
		context.fillStyle = '#FFF';
		context.font = '20px Arial';
    context.translate(150, 150)
		context.fillText('Start', -context.measureText('Start').width / 2, 8);
		context.restore();
  }
  drawArrow() {
    const context = this.context
		context.save();
		context.beginPath();
		context.fillStyle = '#FF0000';
		context.moveTo(140, 125);
		context.lineTo(150, 100);
		context.lineTo(160, 125);
		context.closePath();
		context.fill();
		context.restore();
  }
  render() {
    this.drawPanel()
    this.drawPrizeBlock()
    this.drawButton()
    this.drawArrow()
  }
}