import { useEffect, useState, useRef } from 'react'
import PolarisWizard from '@awsui/components-react/wizard'
import Container from '@awsui/components-react/container'


export default () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const navHeaderActivation = 'Activation'
  const navHeaderConfiguration = 'Configuration'
  const refWizard = useRef(null)
  const Content = () =>
    <Container header={`Step ${activeStepIndex+1}`}>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Container>


  useEffect(navHeadersAdd, [])  // init
  useEffect(navLinksDisable)    // all renders


  // Show explicit error message (default is ambiguous)
  function getWizardElement(): HTMLElement {
    if (!refWizard.current)
      throw Error('Wizard is not yet rendered')
    
    return refWizard.current
  }


  // Add wizard step section headers. Run once and if wizard steps are added/removed
  // a11y concerns can be resolved here using appropriate aria-* attributes
  function navHeadersAdd() {
    const wizard = getWizardElement()
    const steps = wizard.querySelectorAll('nav ul > li')

    const header = document.createElement('li')
    header.className = 'wizard-sectional-nav-header'

    const labelActivate = header.cloneNode(false)
    labelActivate.textContent = navHeaderActivation

    const labelConfig = header.cloneNode(false)
    labelConfig.textContent = navHeaderConfiguration

    steps[0].before(labelActivate)
    steps[2].after(labelConfig)
    steps[2].classList.add('wizard-sectional-nav-item-last')
  }


  // Disable wizard links. Run on every render because links are added/removed
  function navLinksDisable() {
    getWizardElement().querySelectorAll<HTMLAnchorElement>('nav ul > li a')
      .forEach(a => {
        // disable keyboard & mouse interactivity. Prevents click event without event interception
        a.tabIndex = -1
        a.ariaDisabled = 'true'
        a.style.pointerEvents = 'none'
        a.removeAttribute('role')
      })
  }


  return (
    <div ref={refWizard} className="wizard-sectional wizard-nav-links-disabled">
      <PolarisWizard
        activeStepIndex={activeStepIndex}
        i18nStrings={{
          stepNumberLabel: num => `Step ${num}`,
          collapsedStepsLabel: (num, total) => `Step ${num} of ${total}`,
          cancelButton: "Cancel",
          previousButton: "Previous",
          nextButton: "Next",
          submitButton: "Configure",
        }}
        steps={[
          { content: <Content />, title: "Set up gateway" },
          { content: <Content />, title: "Connect to AWS" },
          { content: <Content />, title: "Review and activate" },
          { content: <Content />, title: "Configure gateway" },
        ]}
        onNavigate={({ detail }) => {
          // form validation would call/skip this for pass/fail, respectively
          setActiveStepIndex(detail.requestedStepIndex)
        }}
      />
    </div>
  )
}
