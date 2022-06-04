import '@awsui/global-styles/index.css'
import '/components/app.css'
import AppLayout from '@awsui/components-react/app-layout'
import BreadcrumbGroup from '@awsui/components-react/breadcrumb-group'
import SideNavigation from '@awsui/components-react/side-navigation'
import DefaultPage from '/components/pages/Default'

export default () =>
  // https://cloudscape.design/components/app-layout/
  <AppLayout
    breadcrumbs={
      <BreadcrumbGroup
        items={[
          { text: 'Foo', href: '/#foo'},
          { text: 'Bar', href: '/#bar'},
          { text: new Date().toLocaleTimeString(), href: '/#baz'}, // debug - shows last render time
        ]}
      />
    }
    contentType='default' // default | form | table | cards | wizard
    content={<DefaultPage />}
    navigationWidth={160}
    navigation={
      <SideNavigation
        header={{
          text: 'AWS Console',
          href: '/#',
        }}
        items={[
          { type: 'link', text: 'Foo', href: '/#foo'},
          { type: 'link', text: 'Bar', href: '/#bar'},
          { type: 'link', text: 'Baz', href: '/#baz'},
          { type: 'divider'},
          { type: 'link', text: 'Foo', href: '/#ext1', external: true },
          { type: 'link', text: 'Bar', href: '/#ext2', external: true },
          { type: 'link', text: 'Baz', href: '/#ext3', external: true },
        ]}
      />
    }
  />
