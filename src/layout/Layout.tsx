import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { LayoutProps } from './Layout.props'
import { Sidebar } from './Sidebar/Sidebar'

	export const Layout = ({ children }: LayoutProps) => {
		return (
			<div>
				<Header/>
				<Sidebar/>
				<div>
					{children}
				</div>
				<Footer/>
			</div>
		)
	}