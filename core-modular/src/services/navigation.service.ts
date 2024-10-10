import { filter, first } from 'rxjs/operators';
import type { Luigi } from '../luigi';
export interface TopNavData {
    appTitle: string;
    logo: string;
    topNodes: [any];
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
    children: Node[];
    category?: any;
}

export interface NavItem {
    node?: Node;
    category?: any;
    selected?: boolean;
}

export class NavigationService {
    constructor(private luigi: Luigi) {}
    
    getPathData(path: string): PathData {        
        const cfg = this.luigi.getConfig();
        const pathSegments = path.split('/');
        const rootNodes = cfg.navigation?.nodes || [];
        const pathData: PathData = {
            selectedNodeChildren: rootNodes,
            nodesInPath: [{ children: rootNodes }],
            rootNodes
        };

        pathSegments.forEach(segment => {
            if(pathData.selectedNodeChildren) {
                pathData.selectedNode = pathData.selectedNodeChildren.filter((n: Node) => n.pathSegment === segment )[0];
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
        nodes?.forEach(node => {
            if (node.category) {
                // tbd
            } else {
                items.push({ node, selected: node === selectedNode });
            }
        })
        return items;
    }

    getCurrentNode(path: string): any {
        return this.getPathData(path).selectedNode;
    }

    getLeftNavData(path: string): LeftNavData {
        const pathData = this.getPathData(path);
        

        let navItems: NavItem[] = [];
        let pathToLeftNavParent: Node[] = [];
        let basePath = '';

        pathData.nodesInPath?.forEach(nip => {
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
            topNodes: cfg.navigation?.nodes
        }
    }
}