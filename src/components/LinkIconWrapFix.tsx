/*  Drop-in fix for line-wrapping bug in Polaris v3 Component <Link external />
 *
 *  The current <Link /> component allows the "external" icon to wrap and this,
 *  Component ensures that icon always wraps with the last word.
 *
 *  Current support:
 *
 *    <Link external>
 *      ✓ Text content is supported
 *    </Link>
 *
 *    <Link external>
 *      <div>
 *        Node content is not supported
 *      </div>
 *    </Link>
 */

import { useRef, useEffect, useState } from 'react'
import Link, { LinkProps } from '@awsui/components-react/link'

interface Props extends LinkProps {
  iconWrapFix?: boolean,
}

export default (props: Props) => {
  const refLink = useRef<HTMLElement>(null)

  useEffect(removeBreakingIconSpace) // every render

  function removeBreakingIconSpace() {
    if (!props.iconWrapFix) {
      return
    }

    const link = refLink?.current?.children[0]
    
    if (link && link.childNodes.length > 2) { // <Link external /> 
      const nodes = link.childNodes
      const children = link.children

      const nodeContent = link.childNodes[0]
      if (nodeContent.nodeType !== Node.TEXT_NODE) { // Not yet supports Node content
        return
      }

      const nodeSpacer = link.childNodes[1]
      const nodeIcon = link.childNodes[2]

      nodeContent.textContent = nodeContent.textContent?.trim()
      nodeSpacer.remove()
      nodeIcon.classList.add('link-icon-wrap-fix')
    }
  }

  return (
    <span ref={refLink}><Link {...props} /></span> 
  )
}
