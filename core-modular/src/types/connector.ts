import type { LeftNavData, Node, TopNavData } from "../services/navigation.service";

export interface LuigiConnector {
    renderTopNav(data: TopNavData): void;

    renderLeftNav(data: LeftNavData): void;

    renderContent(node: Node): void;
}