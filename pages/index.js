'use client';

import {
  Badge, BadgeDelta,
  Button, Callout,
  Card, Col, Divider, Flex, Grid, Icon,
  List,
  ListItem,
  Metric,
  Tab, TabGroup,
  TabList, TabPanel, TabPanels,
  Text, TextInput,
  Title,
} from '@tremor/react';

import {
  ArrowDownIcon, AtSymbolIcon, LightningBoltIcon, PlusIcon, ServerIcon, SparklesIcon
} from '@heroicons/react/outline';

import Link from 'next/link';

import {
  useEffect,
  useState
} from 'react';
import Head from 'next/head';
import Header from '@/components/Header';

export default function Home() {
  const [ pricing, setPricing ]   = useState(null);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    fetch('/api/v1/pricing')
      .then((res) => res.json())
      .then((data) => {
        setPricing(data);
        setLoading(false);
      });
  }, []);

  const getNumbers = (num) => {
    switch (num) {
      case -1:
        return 'Unlimited';
      case -2:
        return 'Custom';
      default:
        return num;
    }
  };

  const getRetentionString = (retention) => {
    let finalString = `${retention.amount} `;

    switch (retention.type) {
      case 'week':
        if (retention.amount > 1)
          finalString += 'Weeks';
        else
          finalString += 'Week';
        break;
      case 'year':
        if (retention.amount > 1)
          finalString += 'Years';
        else
          finalString += 'Year';
        break;
      default:
        finalString = 'Custom';
        break;
    }

    return finalString;
  };

  const getAccessString = (access) => {
    return access.substring(0,1).toUpperCase() + access.substring(1);
  };

  const getExportString = (e) => {
    return e ? 'Yes' : 'No';
  };

  return (
    <>
      <Header pageTitle="landing" />

      <div className="max-w-7xl min-h-screen mx-auto px-6 sm:px-8 mb-6">
        <nav className="flex justify-between items-center py-2">
          <Flex className="w-fit gap-2">
            <Title className="font-semibold">Craftlytics</Title>
            <Badge size="xl" color="orange">
              Beta
            </Badge>
          </Flex>

          <div className="flex justify-between items-center gap-4 grow-1">
            <ul className="flex justify-between items-center gap-2">
              <li>
                <Link className="p-2 text-base text-slate-500 hover:text-slate-900 transition-all" href="#">
                  Home
                </Link>
              </li>
              <li>
                <Link className="p-2 text-base text-slate-500 hover:text-slate-900 transition-all" href="#pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="p-2 text-base text-slate-500 hover:text-slate-900 transition-all" href="#">
                  Features
                </Link>
              </li>
              <li>
                <Link className="p-2 text-base text-slate-500 hover:text-slate-900 transition-all" href="#">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="p-2 text-slate-500 hover:text-slate-900" href="#">
                  Blog
                </Link>
              </li>
            </ul>

            <ul className="flex justify-between items-center gap-2">
              <li>
                <Link href="/auth/register">
                  <Button size="xs" variant="secondary">
                    Sign Up
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/auth/login">
                  <Button size="xs" variant="primary">
                    Sign In
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="mb-8">
          <div id="home" className="py-16">
            <h1 className="text-4xl font-semibold text-center">Craftlytics</h1>
          </div>

          <div id="features" className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl">Features</h2>
            </div>

            <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
              <Col>
                <Card className="flex flex-col gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <Icon size="xl" variant="light" icon={SparklesIcon} />
                    <Title>Easy to Use</Title>
                  </div>

                  <Text>
                    It&apos;s easy to get started with our mod api.
                  </Text>
                </Card>
              </Col>
              <Col>
                <Card className="flex flex-col gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <Icon size="xl" variant="light" icon={ServerIcon} />
                    <Title>Hosted by Us</Title>
                  </div>

                  <Text>
                    You don&apos;t need a server to get started. It&apos;s all hosted by us.
                  </Text>
                </Card>
              </Col>
              <Col>
                <Card className="flex flex-col gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <Icon size="xl" variant="light" icon={AtSymbolIcon} />
                    <Title>Weekly Statics</Title>
                  </div>

                  <Text>
                    Get weekly overviews of how your mods are doing in email.
                  </Text>
                </Card>
              </Col>
              <Col>
                <Card className="flex flex-col gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <Icon size="xl" variant="light" icon={PlusIcon} />
                    <Title>Many More</Title>
                  </div>

                  <Text>
                    You can explore the dashboard to discover more features!
                  </Text>
                </Card>
              </Col>
            </Grid>
          </div>

          <div id="pricing" className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl">Pricing</h2>

              { /*
              <Badge color="red">
                Try for free for the first 14 days.
              </Badge>
            */ }
            </div>

            { !isLoading && (
              <TabGroup className="flex flex-col items-center gap-4">
                <TabList variant="solid">
                  <Tab>Monthly</Tab>
                  <Tab>Yearly</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Free Plan</Text>
                        <Metric>${pricing.monthly.free.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.monthly.free.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.monthly.free.features.teamMembers)} + You</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.monthly.free.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.monthly.free.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.monthly.free.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.monthly.free.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Link href="/auth/register">
                          <Button size="md" className="w-full">Sign Up</Button>
                        </Link>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Basic Plan</Text>
                        <Metric>${pricing.monthly.basic.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.monthly.basic.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.monthly.basic.features.teamMembers)} + You</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.monthly.basic.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.monthly.basic.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.monthly.basic.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.monthly.basic.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Button size="md" disabled={true} className="w-full">Coming Soon</Button>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Premium Plan</Text>
                        <Metric>${pricing.monthly.premium.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.monthly.premium.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.monthly.premium.features.teamMembers)}</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.monthly.premium.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.monthly.premium.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.monthly.premium.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.monthly.premium.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Button size="md" disabled={true} className="w-full">Coming Soon</Button>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Enterprise</Text>
                        <Metric>${pricing.monthly.enterprise.price}+</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.monthly.enterprise.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.monthly.enterprise.features.teamMembers)}</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.monthly.enterprise.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.monthly.enterprise.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.monthly.enterprise.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.monthly.enterprise.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Link href="mailto:admin@theclashfruit.me">
                          <Button size="md" className="w-full">Contact Us</Button>
                        </Link>
                      </Card>
                    </Grid>
                  </TabPanel>

                  <TabPanel>
                    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Free Plan</Text>
                        <Metric>${pricing.yearly.free.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.yearly.free.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.yearly.free.features.teamMembers)} + You</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.yearly.free.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.yearly.free.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.yearly.free.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.yearly.free.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Link href="/auth/register">
                          <Button size="md" className="w-full">Sign Up</Button>
                        </Link>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Basic Plan</Text>
                        <Metric>${pricing.yearly.basic.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.yearly.basic.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.yearly.basic.features.teamMembers)} + You</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.yearly.basic.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.yearly.basic.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.yearly.basic.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.yearly.basic.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Button size="md" disabled={true} className="w-full">Coming Soon</Button>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Premium Plan</Text>
                        <Metric>${pricing.yearly.premium.price}</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.yearly.premium.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.yearly.premium.features.teamMembers)}</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.yearly.premium.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.yearly.premium.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.yearly.premium.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.yearly.premium.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Button size="md" disabled={true} className="w-full">Coming Soon</Button>
                      </Card>
                      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                        <Text>Enterprise</Text>
                        <Metric>${pricing.yearly.enterprise.price}+</Metric>

                        <List className="my-2">
                          <ListItem key="projects">
                            <span>Projects</span>
                            <span>{getNumbers(pricing.yearly.enterprise.features.projects)}</span>
                          </ListItem>

                          <ListItem key="teamMembers">
                            <span>Team Members</span>
                            <span>{getNumbers(pricing.yearly.enterprise.features.teamMembers)}</span>
                          </ListItem>

                          <ListItem key="customMetrics">
                            <span>Custom Metrics</span>
                            <span>{getNumbers(pricing.yearly.enterprise.features.metrics)}</span>
                          </ListItem>

                          <ListItem key="dataRetention">
                            <span>Data Retention</span>
                            <span>{getRetentionString(pricing.yearly.enterprise.features.data.retention)}</span>
                          </ListItem>

                          <ListItem key="dataAccess">
                            <span>Data Access</span>
                            <span>{getAccessString(pricing.yearly.enterprise.features.data.access)}</span>
                          </ListItem>

                          <ListItem key="dataExport">
                            <span>Data Export</span>
                            <span>{getExportString(pricing.yearly.enterprise.features.data.export)}</span>
                          </ListItem>
                        </List>

                        <Link href="mailto:admin@theclashfruit.me">
                          <Button size="md" className="w-full">Contact Us</Button>
                        </Link>
                      </Card>
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            )}
          </div>
        </main>

        <footer>
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
            <Col>
              <Title className="font-semibold mb-2">Craftlytics</Title>

              <p className="text-slate-500 text-base mb-1">
                An analytics platform for Minecraft mods.
              </p>

              <p className="text-slate-500 text-base">
                Copyright &copy; {new Date().getFullYear()} TheClashFruit
              </p>
            </Col>
            <Col>
              <Grid numItems={2} className="gap-2">
                <Col>
                  <h3 className="text-sm font-semibold text-slate-700 tracking-wider uppercase">Resources</h3>

                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link href="/docs">
                        <span className="text-base text-slate-500 hover:text-slate-900 transition-all">Docs</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/legal/privacy">
                        <span className="text-base text-slate-500 hover:text-slate-900 transition-all">Privacy</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/legal/terms">
                        <span className="text-base text-slate-500 hover:text-slate-900 transition-all">Terms</span>
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col>
                  <h3 className="text-sm font-semibold text-slate-700 tracking-wider uppercase">Community</h3>

                  <ul className="mt-4 space-y-3">
                    <li>
                      <Link href="https://discord.gg/CWEApqJ6rc">
                        <span className="text-base text-slate-500 hover:text-slate-900 transition-all">Discord</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <span className="text-base text-slate-500 hover:text-slate-900 transition-all">Blog</span>
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Grid>
            </Col>
            <Col>
              <h3 className="text-sm font-semibold text-slate-700 tracking-wider uppercase">Newsletter</h3>

              <p className="mt-4 text-base text-slate-500 mb-6">Get notified about our blog posts and important updates.</p>

              <form>
                <Flex className="gap-2">
                  <TextInput placeholder="Enter your email" name="email" />

                  <Button>Get Updates</Button>
                </Flex>
              </form>
            </Col>
          </Grid>

          <p className="text-slate-500 text-xs text-center mt-2">
            NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
          </p>
        </footer>
      </div>
    </>
  );
}
