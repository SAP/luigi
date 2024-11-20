import type { Luigi } from '../luigi';
export interface TopNavData {
  appTitle: string;
  logo: string;
  topNodes: [any];
  productSwitcher?: ProductSwitcher
}

export interface LeftNavData {
  selectedNode: any;
  items: NavItem[];
  basePath: string;
}

export interface PathData {
  selectedNode?: Node;
  selectedNodeChildren?: Node[];
  nodesInPath?: Node[];
  rootNodes: Node[];
}

export interface Node {
    pathSegment?: string;
    label?: string;
    icon?: string;
    children: Node[];
    category?: any;
}

export interface Category {
  id: string;
  label?: string;
  icon?: string;
  nodes?: NavItem[];
  collabsible?: boolean;
}
export interface NavItem {
  node?: Node;
  category?: Category;
  selected?: boolean;
}

export interface ModalSettings {
  size?: 'fullscreen' | 'l' | 'm' | 's';
  width?: string;
  height?: string;
  title?: string;
  closebtn_data_testid?: string;
}

export interface ProductSwitcher{
    altText?: string,
    columns?: number,
    icon?: string,
    items?: [ProductSwitcherItems]
    label?: string,
    testId?: string,
}

export interface ProductSwitcherItems{
    altText?: string,
    externalLink?:  ExternalLinkItems,
    icon?: string,
    label?: string,
    link?: string,
    selected?: boolean,
    subTitle?: string,
    testId?: string,
}

export interface ExternalLinkItems{
    url?: string;
    sameWindow?: boolean
}

export class NavigationService {
  constructor(private luigi: Luigi) {}

  getPathData(path: string): PathData {
    const cfg = this.luigi.getConfig();
    let pathSegments = path.split('/');
    if (pathSegments?.length > 0 && pathSegments[0] === '') {
      pathSegments = pathSegments.slice(1);
    }
    const rootNodes = cfg.navigation?.nodes || [];
    const pathData: PathData = {
      selectedNodeChildren: rootNodes,
      nodesInPath: [{ children: rootNodes }],
      rootNodes
    };

    pathSegments.forEach((segment) => {
      if (pathData.selectedNodeChildren) {
        pathData.selectedNode = pathData.selectedNodeChildren.filter((n: Node) => n.pathSegment === segment)[0];
        pathData.selectedNodeChildren = pathData.selectedNode?.children;
        if (pathData.selectedNode) {
          pathData.nodesInPath?.push(pathData.selectedNode);
        }
      }
    });
    return pathData;
  }

  buildNavItems(nodes: Node[], selectedNode?: Node): NavItem[] {
    const items: NavItem[] = [];
    const catMap: Record<string, NavItem> = {};
    nodes?.forEach((node) => {
      if (node.category) {
        let catId = node.category.id || node.category.label || node.category;
        let catNode: NavItem = catMap[catId];
        if (!catNode) {
          catNode = {
            category: {
              id: catId,
              label: node.category.label || node.category.id || node.category,
              icon: node.category.icon,
              nodes: []
            }
          };
          catMap[catId] = catNode;
          items.push(catNode);
        }
        catNode.category?.nodes?.push({ node, selected: node === selectedNode });
      } else {
        items.push({ node, selected: node === selectedNode });
      }
    });
    return items;
  }

  shouldRedirect(path: string): string | undefined {
    if (path == '') {
      // poor mans implementation, full path resolution TBD
      const pathData = this.getPathData(path);
      return pathData.rootNodes[0].pathSegment;
    }
    return undefined;
  }

  getCurrentNode(path: string): any {
    return this.getPathData(path).selectedNode;
  }

  getLeftNavData(path: string): LeftNavData {
    const pathData = this.getPathData(path);

    let navItems: NavItem[] = [];
    let pathToLeftNavParent: Node[] = [];
    let basePath = '';

    pathData.nodesInPath?.forEach((nip) => {
      if (nip.children) {
        basePath += '/' + (nip.pathSegment || '');
        pathToLeftNavParent.push(nip);
      }
    });

    if (pathData.selectedNode && pathData.rootNodes.includes(pathData.selectedNode)) {
      navItems = this.buildNavItems(pathData.selectedNode.children);
    } else {
      navItems = this.buildNavItems(pathToLeftNavParent.pop()?.children || [], pathData.selectedNode);
    }

    return {
      selectedNode: pathData.selectedNode,
      items: navItems,
      basePath: basePath.replace(/\/\/+/g, '/')
    };
  }

  getTopNavData(): TopNavData {
    const cfg = this.luigi.getConfig();
    return {
      appTitle: cfg.settings?.header?.title,
      logo: cfg.settings?.header?.logo,
      topNodes: cfg.navigation?.nodes,
      productSwitcher: cfg.navigation?.productSwitcher
    };
  }
}
