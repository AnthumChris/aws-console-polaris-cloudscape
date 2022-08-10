import { useState, useEffect } from 'react'
import Header from '@awsui/components-react/header'
import Container from '@awsui/components-react/container'
import ColumnLayout from '@awsui/components-react/column-layout'
import SpaceBetween from '@awsui/components-react/space-between'
import Link from '/components/LinkIconWrapFix'


const dateFormat = new Intl.DateTimeFormat(navigator.language, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',

  weekday: 'long',

  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
})

const testLinkstestLinks = [
  'Read more',
  'i-b39477013ff11de70',
  'i-0075eb39477ed0983 | storagegateway-wizard 615066',
  'Skolebussen ble sett fra Nationaltheatret',
  <span>Lorem <strong>ipsum dolor</strong> etus a at le</span>,
  'Lorem ipsum dolor etus mia vestibus etu',
  'SuperCalifragilisticExpialidociousWrapsLetters',
]

export default () => {
  const [date, setDate] = useState(new Date())
  const [intervalId, setIntervalId] = useState(-1)


  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setDate(new Date())
      }, 1000/60) // test with high FPS
    )

    return () => stopThreads()
  }, [])


  function stopThreads() {
    window.clearInterval(intervalId)
    setIntervalId(-1)
  }

  const TimeRow = (props: { iconWrapFix?: boolean }) => {
    return (
      <div><Link external {...props}>{dateFormat.format(date)}</Link></div>
    )
  }


  return (
    <SpaceBetween direction="vertical" size="l">
      <Container header={<Header variant="h2" description="❌  <Link external /> allows standalone icon wrap"> Default</Header>}>
        <ColumnLayout columns={4} borders="all">
          <TimeRow />
          { testLinkstestLinks.map((str, i) => <div key={i}><Link external>{str}</Link></div>) }
        </ColumnLayout>
      </Container>

      <Container header={<Header variant="h2" description="✅  Icon always wraps with adjacent/last word">Fixed</Header>}>
        <ColumnLayout columns={4} borders="all">
          <TimeRow iconWrapFix />
          { testLinkstestLinks.map((str, i) => <div key={i}><Link external iconWrapFix>{str}</Link></div>) }
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  )  
}
