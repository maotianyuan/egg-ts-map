export function handlerExceelTime(days: number): string {
  if (!days) return days + ''
  const date: Date = new Date('1900-01-01')
  days -= 2
  date.setDate(date.getDate() + days)
  let month: number | string = date.getMonth() + 1
  let day: number | string = date.getDate()
  const mm = "'" + month + "'"
  const dd = "'" + day + "'"
  if (mm.length === 3) {
    month = '0' + month
  }
  if (dd.length === 3) {
    day = '0' + day
  }
  const time = date.getFullYear() + '-' + month + '-' + day
  return time
}
export const HEAMP_MARKER_ICON = {
  yellow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACY0lEQVRIS63VP2gTcRQH8O/3EhzaqYu1dxEUDMSKS2nuEEQUUXETBAcH8d9QnVSoDraCohX8Bw6aSUUcHARdpYNFEEwu7VBoHAQLxfuliOKkkKb2nuSaosbkfndJbv299/vce7+73yMiPCIwUEwdAuQIhPtB9AVpgu+gTAJ8gaz3ioTotqMuQNyBXRDjKchNmth5GHKaw2oqLK4lKAKiaE4AvARQ+2KriAgEN2GrsVbVtgZdaxzgNV0Hmq6LjNFRN5qtNQWlYO0A8Q6g0RYI8SHYSUe9b8xvDrpW7UPY1x5WzxJM0vEOaEFxzY0AF6KfW6vXEkHS38yhxYW/I/6rUIrmSYjxqKPq1pLpn2K2/DgcdM0rgHG1KyBknLa6Hg4WrBzIkS6BOdrqrA68B/J8V0DBbTreRR04AjLXFZD+UWbLz8PBmYGtWEl86Bys3cBLFoe/LYaCwQVVSJVADHaEiryho/Zq/8MAdK3jAJ90BFKOMaueRQOnkESPpUCubw+Vr/ipTO7Br0hgUGXRHIUYt9oD/VHa5TuRL+8AnO3vRSX5CWR/PFQ+o0+lmcZSLLB+lmcAPowH4jBt72WrnNDBKoIEitYcwExE9DVt72BYrHaSSzFlQyQfYXosg8sZZr/MdwSufkDWXQgvhFYpMkFHXdZ1QlthAJawDj+sOZDpFhuW0OsNcRuqXQEDdDrlwEe+yYZViGynoz7qsNp6pArXNhLXegDwn3ED4Bxt734ULD44bfZgxZgFsaUOvKXt7Y6KxQaD1uY3DILJGQBVJCqZxmmgw2O19E9rzRMgKo2zTofV1n8D1HbLHTQ3y6QAAAAASUVORK5CYII=',
  green: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACnElEQVRIS63VO2gUURQG4P/cTSSJgtgYiAiKmUmy2buFhSKICKJiJwgWFuKriBZi1J1FTGQVjc5uIlhoKhWxEBS0lRSKIJjGIjs7wszGaBC1EG1jXnPkhgRisjt39rFsdx7fnDuPQ4jy44wwCs2HCXSUmA+AaMNi2R8GjzDwopiwXoGIde1Il2Dk7+wRoCcg2hKWy8wTJHDGS6TfhuWVB5nJdHMDYKQJ0F6YQnjhj9t+ItVXbtqyjTrydj+IbuhOoFQ8APcVZfpWqVhJsD2f2yUoeE8gUQ3I4CBgsXs8mfqwsr4kaDr2CIH2V4MtqxnxpHVQC25zhjbHMD8Z9b6Vuyh1P2djYuuX+OXJ5TmrJuxwsqcAPKxxuqXy0560HoWCZj57jQjX6wIS+r2EdVMzoT0MUE9dQGDYk9Y53YR3idBbH5BznkxboaDh2D0CNFwPMCAcKyasZzqwS4A+1Qqqp3Q61rhpMt77MxRUQdPJugTEa0GZ8cZPWvu076FKMPLZE4LwuCYQfNyX6aeRQHCmwXRavhNhYzUoM//y5VQbKDMXDVRTOnZKgLLVgAGQKkprMPLHWyW2juXWrhfBZwK1VoIy8C1oajLGjfPTFYEqucPJngXwoBIwAB8pyvTLcjXhi5Wfx8zC1wIBnZFQxmsvaR0Ky9VucrNg7wDTqHZ7MGYZ851+8spETeDCe1mwh4jpYlgjBgZ8aV3VnYR2QtWg282smQtaCurhLdWQmd3G2NR2tzszUxdw4WPg5naKgEdXN+SZ2YYGOdF1yddhKh5pwqVGpmPfJ9B/6wbABU9a96JgFYNtPzIt6343jxGofRF450lrb1SsYlAVtLuDcRHMfwRoZjrW2LlyG+jwio50qZmRt09C0N+Vu06Hqfg/5x/cHac7QxEAAAAASUVORK5CYII=',
  blue: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVRYR8WXwVUbQQyGP5FDuEEHMQfw3jAdQAWQChIqACpIqCCmA6gAUwEvFcTcdpMDLgFu+ADiiWUfCZ7Z0XrnvczVWunTPxpJFrqcga7zkS/ALsIIGLx+PkOZIkx44IqZ3HndisvQAq9yhHKMsN76jXKHMOaBMw9IGqDO+vo1Yxfvi5EpMmcvBdEOUAe/TWYdwzI15my0QcQBls38PUxCiThAod+Bb37NWy1PKcX8LZwwQF/pF1WIXkUYYKhW7T8yZd+4OaSU8/c+YwAThP2sAMoVlRz4AAqdAZ8yA0ypZMcLoFmDN85KWVA8fAWF/meAoVpf386qgnJDJTY//jkxBaxabejkPBeU8tUHsKUHrHCZMzpPfOa3THwAZjVUm2prWSCUeyoJTtF4Kx7qGOEoE8AZlRz7W7FZFmrLxm0WANigFOstzlnQmBWaoxiDxdeEaN8H8qgQzd4g0htRn1pQonfvU8Cs6tE86/wirPLnDPqtZA3mMuNZOaGScaqI01fwBtGlPf+klN1UcF8NNF42dcQHfnmc8sgOf2TqsfUrUPcGz54Y3f+694HQF22TMjLx2pTopoB5aruKDtL7n2EIP3wVnaTvB1BPy7dXsYT0/QGsTdu/nvotjWLDJvUSutfA3x4LrTecwL6fCtz8/gyG+aMhVef6mQAAAABJRU5ErkJggg==',
  lightBlue: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGElEQVQ4T62TzU3DQBCF37OSM44w9zhuwB2EDiAVQAdABYQKgA6gAlwCVEAaiDd3jDDnRH5oEWv5Z5X4gC/W/Oy3b2ZnCM93bHRO4QpA+hdeiXj8jJl109l1RLkyAmc+sISsSLhoxlqAaK0liVvfYeeTcFckXDq7BoRG07Fg9h12sS0RlzE31q4Btu5AeBkCqIiF60cNGCLfV8b/KQiNwrHwNaSELTEpY5atHljjJNcTgIsDkOePGS97r/ALMEohvO8DNF+gp2CAitbtXoDtxajChsRRU4mE712AqavdW4JzRmtdk7jvAG6KhA8Hd6GG5HolMLe2gLdixlNfb3rL5JLsaI8qrKy9C5C60R2swCba8bZ/3xo70A/oImwR9i6hcwAAAABJRU5ErkJggg==',
  pink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABL0lEQVQ4T61TzU3DMBh9nw9BXOqwQdkgCzRkA8gpcIINgAkoExQ2gBMNl2aENB2AbkA3oK6QEJHwhww4ShqryQFfrO/Hz+99PwTH2YzSEy34EqDgN8xLoel+sEiy7XTadqhwmoHo2AXMQObPk7geawCoMB2DcON6XPkYt7JIxtauAD6ip2HJ4nXn47+gR/pwPz9bGbMCMLpZYNYHgDRiW48KoBd9i16T8X8MOJr5Gy7f+kgYkHdAebxu1MAYKkwfQDjv6MKjLJKLVheM4z16Dr6YX3YB1DvQYtDJgtH43QlgaqG4XBEg60wYUJK8odXulGCdajS9gqBJQ4rma7k4vevcBZuwDtOcCEc/q8SY+0USuWrTWiabZEb7k8XS2HukAzu6vRmYRDPe5natsQX6Bl8CcxGW4tXnAAAAAElFTkSuQmCC',
}

export function toInt(str: any) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}
